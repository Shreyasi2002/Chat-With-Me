/* eslint-disable arrow-body-style */
import React from 'react';

import { Exit } from '@rsuite/icons';

import { Button, Drawer } from 'rsuite';
import { useProfile } from '../../context/profile.context';

const DashboardShow = ({ onSignout }) => {
    const { profile } = useProfile();

    return (
        <>
            <Drawer.Header>
                <Drawer.Title>Dashboard</Drawer.Title>
            </Drawer.Header>

            <Drawer.Body>
                <h3>Hey!! {profile.name}</h3>
                <Drawer.Actions>
                    <Button
                        block
                        color="red"
                        appearance="primary"
                        onClick={onSignout}
                    >
                        <Exit /> Sign Out
                    </Button>
                </Drawer.Actions>
            </Drawer.Body>
        </>
    );
};

export default DashboardShow;
