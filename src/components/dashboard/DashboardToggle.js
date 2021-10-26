/* eslint-disable arrow-body-style */
import React, { useCallback } from 'react';

import { Icon } from '@rsuite/icons';
import { ImProfile } from 'react-icons/im';

import { Button, Drawer, Message, toaster } from 'rsuite';
import { useMediaQuery, useModalState } from '../../misc/custom-hooks';

import DashboardShow from '.';
import { auth, database } from '../../misc/firebase';
import { isOfflineForDatabase } from '../../context/profile.context';

const DashboardToggle = () => {
    const { isOpen, open, close } = useModalState();
    const isMobile = useMediaQuery('(max-width: 992px)');

    const onSignout = useCallback(() => {
        database
            .ref(`/status/${auth.currentUser.uid}`)
            .set(isOfflineForDatabase)
            .then(() => {
                auth.signOut();

                toaster.push(
                    <Message showIcon type="success" duration={4000}>
                        Success : Signed Out Successfully
                    </Message>
                );
                close();
            })
            .catch(err => {
                toaster.push(
                    <Message showIcon type="error" duration={4000}>
                        {err.message}
                    </Message>
                );
            });
    }, [close]);

    return (
        <>
            <Button block color="blue" appearance="primary" onClick={open}>
                <Icon as={ImProfile} size="1.5em" /> Profile
            </Button>
            <Drawer
                full={isMobile}
                open={isOpen}
                onClose={close}
                placement="left"
            >
                <DashboardShow onSignout={onSignout} />
            </Drawer>
        </>
    );
};

export default DashboardToggle;
