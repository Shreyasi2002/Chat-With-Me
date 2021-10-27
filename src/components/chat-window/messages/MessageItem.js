/* eslint-disable no-constant-condition */
/* eslint-disable arrow-body-style */
import React, { memo } from 'react';
import { Button, Message } from 'rsuite';
import TimeAgo from 'timeago-react';

import { useCurrentRoom } from '../../../context/current-room.context';
import { useHover } from '../../../misc/custom-hooks';
import { auth } from '../../../misc/firebase';
import PresenceDot from '../../PresenceDot';

import ProfileAvatar from '../../ProfileAvatar';
import IconBtnControl from './IconBtnControl';
import ProfileInfoBtnModal from './ProfileInfoBtnModal';

export const getFormattedMessage = text => {
    const lines = text.split('\n');

    return lines.map(line => (
        <>
            {line} <br />
        </>
    ));
};

const MessageItem = ({ messages, handleAdmin, handleLike, handleDelete }) => {
    const { author, createdAt, text, likes, likeCount } = messages;

    const [selfRef, isHover] = useHover();

    const isAdmin = useCurrentRoom(v => v.isAdmin);
    const admins = useCurrentRoom(v => v.admins);

    const isMsgAuthorAdmin = admins.includes(author.uid);
    const isAuthor = auth.currentUser.uid === author.uid;

    const canGrantAdmin = isAdmin && !isAuthor;

    const isLiked = likes && Object.keys(likes).includes(auth.currentUser.uid);

    return (
        <li
            className={`padded mb-1 cursor-pointer ${
                isHover ? 'bg-black-04' : ''
            }`}
            ref={selfRef}
        >
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
                >
                    <br />
                    {canGrantAdmin && (
                        <Button
                            block
                            onClick={() => handleAdmin(author.uid)}
                            color="blue"
                            appearance="primary"
                        >
                            {isMsgAuthorAdmin
                                ? 'Remove Admin Permission'
                                : 'Give Admin Permission For This Room'}
                        </Button>
                    )}
                </ProfileInfoBtnModal>

                <TimeAgo
                    datetime={createdAt}
                    className="font-normal text-black-60 ml-2"
                />

                <IconBtnControl
                    heart
                    isLiked={isLiked}
                    tooltip="Like this message"
                    onClick={() => handleLike(messages.id)}
                    badgeContent={likeCount}
                />

                {isAuthor && (
                    <IconBtnControl
                        heart={false}
                        tooltip="Delete this message"
                        onClick={() => handleDelete(messages.id)}
                    />
                )}
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

export default memo(MessageItem);
