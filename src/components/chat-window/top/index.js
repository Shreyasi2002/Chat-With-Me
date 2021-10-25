/* eslint-disable arrow-body-style */
import React, { memo } from 'react';
import { useCurrentRoom } from '../../../context/current-room.context';

const Top = () => {
    const name = useCurrentRoom(state => state.name);

    return <div>{name}</div>;
};

export default memo(Top);
