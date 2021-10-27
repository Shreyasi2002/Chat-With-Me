/* eslint-disable arrow-body-style */
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Message, toaster } from 'rsuite';
import { auth, database } from '../../../misc/firebase';
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
            <Message showIcon type="info" duration={4000}>
                {alertMsg}
            </Message>
        );
    }, []);

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
                    />
                ))}
        </ul>
    );
};

export default Messages;
