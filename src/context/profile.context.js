import React, { createContext, useContext, useState } from 'react';

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
    const [profile] = useState(false);
    return (
        <ProfileContext.Provider value={profile}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = () => useContext(ProfileContext);
