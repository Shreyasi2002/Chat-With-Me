/* eslint-disable arrow-body-style */
import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router';

import firebase from 'firebase/compat/app';

import { Icon } from '@rsuite/icons';
import { IoIosSend } from 'react-icons/io';
import { Input, InputGroup, Message, toaster } from 'rsuite';
import { useProfile } from '../../../context/profile.context';
import { database } from '../../../misc/firebase';

function assembleMessage(profile, chatId) {
    return {
        roomId: chatId,
        author: {
            name: profile.name,
            uid: profile.uid,
            createdAt: profile.createdAt,
            ...(profile.avatar ? { avatar: profile.avatar } : {}),
        },
        createdAt: firebase.database.ServerValue.TIMESTAMP,
    };
}

const Bottom = () => {
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { profile } = useProfile();
    const { chatId } = useParams();

    const onInputChange = useCallback(value => {
        setInput(value);
    }, []);

    const onSendClick = async () => {
        if (input.trim() === '') {
            return;
        }
        const msgData = assembleMessage(profile, chatId);
        msgData.text = input;

        const updates = {};

        const messageId = database.ref('messages').push().key;

        updates[`/messages/${messageId}`] = msgData;
        updates[`/rooms/${chatId}/lastMessage`] = {
            ...msgData,
            msgId: messageId,
        };

        setIsLoading(true);

        try {
            await database.ref().update(updates);

            setInput('');
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);

            toaster.push(
                <Message showIcon type="error" duration={4000}>
                    {error.message}
                </Message>
            );
        }
    };

    return (
        <div>
            <InputGroup>
                <Input
                    as="textarea"
                    rows={1}
                    placeholder="Write a new Message"
                    value={input}
                    onChange={onInputChange}
                />
                <InputGroup.Button
                    color="blue"
                    appearance="primary"
                    onClick={onSendClick}
                    disabled={isLoading}
                >
                    <Icon as={IoIosSend} size="2em" />
                </InputGroup.Button>
            </InputGroup>
        </div>
    );
};

export default Bottom;
