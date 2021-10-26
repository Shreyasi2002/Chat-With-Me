/* eslint-disable arrow-body-style */

import React from 'react';
import { Badge, Tooltip, Whisper } from 'rsuite';
import { usePresence } from '../misc/custom-hooks';

const getColor = presence => {
    if (!presence) {
        return 'cyan';
    }

    switch (presence.state) {
        case 'online':
            return 'green';

        case 'offline':
            return 'red';

        default:
            return 'cyan';
    }
};

const getText = presence => {
    if (!presence) {
        return 'Unknown';
    }

    return presence.state === 'online'
        ? 'Online'
        : `Last Seen ${new Date(presence.last_changed).toLocaleString()}`;
};

const PresenceDot = ({ uid, element }) => {
    const presence = usePresence(uid);

    return (
        <Whisper
            placement="right"
            controlId="control-id-hover"
            trigger="hover"
            speaker={<Tooltip>{getText(presence)}</Tooltip>}
        >
            <Badge className="cursor-pointer" color={getColor(presence)}>
                {element}
            </Badge>
        </Whisper>
    );
};

export default PresenceDot;
