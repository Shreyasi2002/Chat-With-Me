/* eslint-disable consistent-return */
/* eslint-disable no-alert */
/* eslint-disable arrow-body-style */
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Message, toaster } from 'rsuite';
import { auth, database, storage } from '../../../misc/firebase';
import { transformToArrayWithId } from '../../../misc/helpers';
import MessageItem from './MessageItem';

const Messages = () => {
    const [messages, setMessages] = useState(null);
    const { chatId } = useParams();

    const isChatEmpty = messages && messages.length === 0;
    const canShowMessages = messages && messages.length > 0;

    useEffect(() => {
        const messagesRef = database.ref('/messages');

        messagesRef
            .orderByChild('roomId/')
            .equalTo(chatId)
            .on('value', snap => {
                const data = transformToArrayWithId(snap.val());

                setMessages(data);
            });

        return () => {
            messagesRef.off('value');
        };
    }, [chatId]);

    const handleAdmin = useCallback(
        async uid => {
            const adminsRef = database.ref(`/rooms/${chatId}/admins`);

            let alertMsg;

            await adminsRef.transaction(admins => {
                if (admins) {
                    if (admins[uid]) {
                        admins[uid] = null;
                        alertMsg = 'Admin Permission Revoked';
                    } else {
                        admins[uid] = true;
                        alertMsg = 'Admin Permission Granted';
                    }
                }
                return admins;
            });

            toaster.push(
                <Message showIcon type="info" duration={4000}>
                    {alertMsg}
                </Message>
            );
        },
        [chatId]
    );

    const handleLike = useCallback(async msgId => {
        const { uid } = auth.currentUser;
        const messageRef = database.ref(`/messages/${msgId}`);

        let alertMsg;

        await messageRef.transaction(msg => {
            if (msg) {
                if (msg.likes && msg.likes[uid]) {
                    msg.likeCount -= 1;
                    msg.likes[uid] = null;
                    alertMsg = 'Like Removed';
                } else {
                    msg.likeCount += 1;

                    if (!msg.likes) {
                        msg.likes = {};
                    }
                    msg.likes[uid] = true;
                    alertMsg = 'You Liked the Message';
                }
            }
            return msg;
        });

        toaster.push(
            <Message showIcon type="info" duration={1000}>
                {alertMsg}
            </Message>
        );
    }, []);

    const handleDelete = useCallback(
        async (msgId, file) => {
            if (!window.confirm('Are you sure to delete this message?')) {
                return;
            }
            const isLast = messages[messages.length - 1].id === msgId;
            const updates = {};

            updates[`/messages/${msgId}`] = null;

            if (isLast && messages.length > 1) {
                updates[`/rooms/${chatId}/lastMessage`] = {
                    ...messages[messages.length - 2],
                    msgId: messages[messages.length - 2].id,
                };
            }

            if (isLast && messages.length === 1) {
                updates[`/rooms/${chatId}/lastMessage`] = null;
            }

            try {
                await database.ref().update(updates);

                toaster.push(
                    <Message showIcon type="success" duration={4000}>
                        Success : Message has been successfully deleted.
                    </Message>
                );
            } catch (error) {
                return toaster.push(
                    <Message showIcon type="error" duration={4000}>
                        {error.message}
                    </Message>
                );
            }

            if (file) {
                try {
                    const fileRef = storage.refFromURL(file.url);
                    await fileRef.delete();
                } catch (error) {
                    toaster.push(
                        <Message showIcon type="error" duration={4000}>
                            {error.message}
                        </Message>
                    );
                }
            }
        },
        [chatId, messages]
    );

    return (
        <ul className="msg-list custom-scroll">
            {isChatEmpty && <li>No messages yet</li>}
            {canShowMessages &&
                messages.map(msg => (
                    <MessageItem
                        key={msg.id}
                        messages={msg}
                        handleAdmin={handleAdmin}
                        handleLike={handleLike}
                        handleDelete={handleDelete}
                    />
                ))}
        </ul>
    );
};

export default Messages;
