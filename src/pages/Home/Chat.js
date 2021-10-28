/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import React from 'react';
import { useParams } from 'react-router';
import { Button, Loader } from 'rsuite';

import ChatTop from '../../components/chat-window/top';
import ChatBottom from '../../components/chat-window/bottom';

import { useRooms } from '../../context/rooms.context';
import { CurrentRoomProvider } from '../../context/current-room.context';
import { transformToArray } from '../../misc/helpers';
import { auth } from '../../misc/firebase';

import NOT_FOUND from '../../images/404.png';
import Messages from '../../components/chat-window/messages';
import { useMediaQuery } from '../../misc/custom-hooks';

const Chat = () => {
    const { chatId } = useParams();

    const isMobile = useMediaQuery('(max-width: 992px)');

    const rooms = useRooms();
    if (!rooms) {
        return <Loader center vertical size="md" content="Loading..." />;
    }

    const currentRoom = rooms.find(room => room.id === chatId);
    if (!currentRoom) {
        return (
            <>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <img src={NOT_FOUND} alt="start" className="mt-page" />
                </div>
                <br />
                <h4
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        textAlign: 'center',
                        fontFamily: 'cursive',
                    }}
                >
                    <b>OOPS! Chatroom not found</b>
                </h4>
                <br />
                {isMobile && (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <Button href="/" appearance="primary">
                            Go Back
                        </Button>
                    </div>
                )}
            </>
        );
    }

    const { name, description } = currentRoom;

    const admins = transformToArray(currentRoom.admins);
    const isAdmin = admins.includes(auth.currentUser.uid);

    const currentRoomData = {
        name,
        description,
        admins,
        isAdmin,
    };

    return (
        <CurrentRoomProvider data={currentRoomData}>
            <div className="chat-top">
                <ChatTop />
            </div>
            <div className="chat-middle">
                <Messages />
            </div>
            <div className="chat-bottom">
                <ChatBottom />
            </div>
        </CurrentRoomProvider>
    );
};

export default Chat;
