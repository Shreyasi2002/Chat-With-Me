/* eslint-disable arrow-body-style */
import React from 'react';
import { useLocation } from 'react-router';
import { Loader, Nav } from 'rsuite';
import { useRooms } from '../../context/rooms.context';
import RoomItem from './RoomItem';

const ChatRoomList = ({ aboveElementHeight }) => {
    const rooms = useRooms();

    const location = useLocation();

    return (
        <Nav
            appearance="subtle"
            vertical
            reversed
            className="overflow-y-scroll custom-scroll"
            style={{
                height: `calc(100% - ${aboveElementHeight}px)`,
            }}
            activeKey={location.pathname}
        >
            {!rooms && (
                <Loader center vertical content="Loading ..." size="md" />
            )}

            {rooms &&
                rooms.length > 0 &&
                rooms.map(room => (
                    <Nav.Item
                        href={`/chat/${room.id}`}
                        key={room.id}
                        eventKey={`/chat/${room.id}`}
                    >
                        <RoomItem room={room} />
                    </Nav.Item>
                ))}
        </Nav>
    );
};

export default ChatRoomList;
