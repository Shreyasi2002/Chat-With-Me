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
import { getUserUpdates } from '../../misc/helpers';
import EditableDescription from '../EditableDescription';

const DashboardShow = ({ onSignout }) => {
    const { profile } = useProfile();

    const onSave = async newData => {
        try {
            const updates = await getUserUpdates(
                profile.uid,
                'name',
                newData,
                database
            );

            await database.ref().update(updates);

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

            <Drawer.Body
                style={{
                    marginLeft: '-6%',
                    marginRight: '-6%',
                }}
            >
                <h3>Hey, {profile.name}</h3>
                <ProviderBlock />
                <Divider />
                <AvatarUploadBtn />

                <EditableInput
                    name="username"
                    initialValue={profile.name}
                    onSave={onSave}
                    label={<h6 className="mb-2">Username</h6>}
                />
                <br />
                <EditableDescription
                    name="about"
                    initialValue="Hello..."
                    onSave={onSave}
                    label={<h6 className="mb-2">About</h6>}
                />

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
