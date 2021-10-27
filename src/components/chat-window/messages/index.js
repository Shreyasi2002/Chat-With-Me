/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable consistent-return */
/* eslint-disable no-alert */
/* eslint-disable arrow-body-style */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { Button, Message, toaster } from 'rsuite';

import { auth, database, storage } from '../../../misc/firebase';
import { groupBy, transformToArrayWithId } from '../../../misc/helpers';
import MessageItem from './MessageItem';

const PAGE_SIZE = 10;
const messagesRef = database.ref('/messages');

const Messages = () => {
    const [messages, setMessages] = useState(null);
    const { chatId } = useParams();

    const [limit, setLimit] = useState(PAGE_SIZE);
    const selfRef = useRef();

    const isChatEmpty = messages && messages.length === 0;
    const canShowMessages = messages && messages.length > 0;

    const loadMessages = useCallback(
        limitToLast => {
            messagesRef.off();

            messagesRef
                .orderByChild('roomId/')
                .equalTo(chatId)
                .limitToLast(limitToLast || PAGE_SIZE)
                .on('value', snap => {
                    const data = transformToArrayWithId(snap.val());
                    setMessages(data);

                    const node = selfRef.current;

                    setTimeout(() => {
                        node.scrollTop = node.scrollHeight;
                    }, 200);
                });

            setLimit(p => p + PAGE_SIZE);
        },
        [chatId]
    );

    const onLoadMore = useCallback(() => {
        loadMessages(limit);
    }, [loadMessages, limit]);

    useEffect(() => {
        const node = selfRef.current;

        loadMessages();

        setTimeout(() => {
            node.scrollTop = node.scrollHeight;
        }, 200);

        return () => {
            messagesRef.off('value');
        };
    }, [loadMessages]);

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

    const renderMessages = () => {
        const groups = groupBy(messages, item =>
            new Date(item.createdAt).toDateString()
        );

        const items = [];

        Object.keys(groups).forEach(date => {
            items.push(
                <li key={date} className="text-center mb-1 padded">
                    {date}
                </li>
            );
            const msgs = groups[date].map(msg => (
                <MessageItem
                    key={msg.id}
                    messages={msg}
                    handleAdmin={handleAdmin}
                    handleLike={handleLike}
                    handleDelete={handleDelete}
                />
            ));

            // items = items.concat(msgs);
            items.push(...msgs);
        });

        return items;
    };

    return (
        <ul ref={selfRef} className="msg-list custom-scroll">
            {messages && messages.length >= PAGE_SIZE && (
                <li className="text-center mt-2 mb-2">
                    <Button
                        onClick={onLoadMore}
                        color="blue"
                        appearance="ghost"
                    >
                        Load More
                    </Button>
                </li>
            )}
            {isChatEmpty && <li>No messages yet</li>}
            {canShowMessages && renderMessages()}
        </ul>
    );
};

export default Messages;
