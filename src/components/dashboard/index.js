/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import React from 'react';

import { Exit } from '@rsuite/icons';

import { Button, Divider, Drawer, toaster, Message } from 'rsuite';
import { useProfile } from '../../context/profile.context';
import EditableInput from '../EditableInput';
import { database } from '../../misc/firebase';
import ProviderBlock from './ProviderBlock';
import AvatarUploadBtn from './AvatarUploadBtn';

const DashboardShow = ({ onSignout }) => {
    const { profile } = useProfile();

    const onSave = async newData => {
        const userName = database.ref(`/profiles/${profile.uid}`).child('name');

        try {
            await userName.set(newData);
            toaster.push(
                <Message showIcon type="success" duration={4000}>
                    Success : Your Username has been updated to {newData}
                </Message>,
                { placement: 'topStart' }
            );
        } catch (error) {
            toaster.push(
                <Message showIcon type="error" duration={4000}>
                    {error.message}
                </Message>,
                { placement: 'topStart' }
            );
        }
    };

    return (
        <>
            <Drawer.Header>
                <Drawer.Title>
                    <h4>Profile</h4>
                </Drawer.Title>
            </Drawer.Header>

            <Drawer.Body>
                <h3>Hey!! {profile.name}</h3>
                <ProviderBlock />
                <Divider />
                <AvatarUploadBtn />
                <br />
                <EditableInput
                    name="username"
                    initialValue={profile.name}
                    onSave={onSave}
                    label={<h5 className="mb-2">Username</h5>}
                />
                <br />
                <Divider />
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
