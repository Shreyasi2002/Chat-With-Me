/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-vars */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { database } from '../misc/firebase';
import { transformToArrayWithId } from '../misc/helpers';

const RoomsContext = createContext();

export const RoomsProvider = ({ children }) => {
    const [rooms, setRooms] = useState(null);

    useEffect(() => {
        const roomListRef = database.ref('rooms');

        roomListRef.on('value', snap => {
            const data = transformToArrayWithId(snap.val());
            setRooms(data);
        });

        return () => {
            roomListRef.off();
        };
    }, []);
    return (
        <RoomsContext.Provider value={rooms}>{children}</RoomsContext.Provider>
    );
};

export const useRooms = () => useContext(RoomsContext);
