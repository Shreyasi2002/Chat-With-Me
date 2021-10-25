/* eslint-disable arrow-body-style */
import React from 'react';
import { Avatar, Whisper, Tooltip } from 'rsuite';
import { getNameInitials } from '../misc/helpers';

const ProfileAvatar = ({ name, ...avatarProps }) => {
    return (
        <>
            <Whisper
                placement="right"
                controlId="control-id-hover"
                trigger="hover"
                speaker={<Tooltip>Profile Picture</Tooltip>}
            >
                <Avatar circle {...avatarProps}>
                    {getNameInitials(name)}
                </Avatar>
            </Whisper>
        </>
    );
};

export default ProfileAvatar;
