/* eslint-disable arrow-body-style */
import React from 'react';
import { Message } from 'rsuite';
import TimeAgo from 'timeago-react';
import PresenceDot from '../../PresenceDot';

import ProfileAvatar from '../../ProfileAvatar';
import ProfileInfoBtnModal from './ProfileInfoBtnModal';

export const getFormattedMessage = text => {
    const lines = text.split('\n');

    return lines.map(line => (
        <>
            {line} <br />
        </>
    ));
};

const MessageItem = ({ messages }) => {
    const { author, createdAt, text } = messages;

    return (
        <li className="padded mb-1">
            <div className="d-flex align-items-center font-bolder mb-1">
                <PresenceDot
                    uid={author.uid}
                    element={
                        <ProfileAvatar
                            src={author.avatar}
                            name={author.name}
                            className="ml-1"
                            size="md"
                        />
                    }
                />
                <ProfileInfoBtnModal
                    profile={author}
                    appearance="link"
                    className="p-0 ml-2 text-black"
                />

                <TimeAgo
                    datetime={createdAt}
                    className="font-normal text-black-60 ml-2"
                />
            </div>

            <div>
                <Message>
                    <span className="word-break-all">
                        {getFormattedMessage(text)}
                    </span>
                </Message>
            </div>
        </li>
    );
};

export default MessageItem;
