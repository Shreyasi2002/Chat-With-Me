/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import React from 'react';

import { Exit } from '@rsuite/icons';

import { Button, Divider, Drawer } from 'rsuite';
import { useProfile } from '../../context/profile.context';
import EditableInput from '../EditableInput';

const DashboardShow = ({ onSignout }) => {
    const { profile } = useProfile();

    const onSave = async newData => {};

    return (
        <>
            <Drawer.Header>
                <Drawer.Title>Dashboard</Drawer.Title>
            </Drawer.Header>

            <Drawer.Body>
                <h3>Hey!! {profile.name}</h3>
                <Divider />
                <EditableInput
                    name="nickname"
                    initialValue={profile.name}
                    onSave={onSave}
                    label={<h4 className="mb-2">Nickname</h4>}
                />
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
