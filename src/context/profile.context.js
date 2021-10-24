/* eslint-disable no-unused-vars */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, database } from '../misc/firebase';

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let userRef = null;
        const authUnsub = auth.onAuthStateChanged(authObj => {
            if (authObj) {
                userRef = database.ref(`/profiles/${authObj.uid}`);

                userRef.on('value', snap => {
                    const { name, createdAt } = snap.val();
                    const profiles = {
                        name,
                        createdAt,
                        uid: authObj.uid,
                        email: authObj.email,
                    };
                    setProfile(profiles);
                    setIsLoading(false);
                });
            } else {
                if (userRef) {
                    userRef.off();
                }
                setProfile(null);
                setIsLoading(false);
            }
        });

        return () => {
            authUnsub();
            if (userRef) {
                userRef.off();
            }
        };
    }, []);

    return (
        <ProfileContext.Provider value={{ profile, isLoading }}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = () => useContext(ProfileContext);
