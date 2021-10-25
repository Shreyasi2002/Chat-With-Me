/* eslint-disable arrow-body-style */
import React, { useCallback } from 'react';

import { Icon } from '@rsuite/icons';
import { ImProfile } from 'react-icons/im';

import { Button, Drawer, Message, toaster } from 'rsuite';
import { useMediaQuery, useModalState } from '../../misc/custom-hooks';

import DashboardShow from '.';
import { auth } from '../../misc/firebase';

const DashboardToggle = () => {
    const { isOpen, open, close } = useModalState();
    const isMobile = useMediaQuery('(max-width: 992px)');

    const onSignout = useCallback(() => {
        auth.signOut();

        toaster.push(
            <Message showIcon type="success" duration={4000}>
                Success : Signed Out Successfully
            </Message>
        );

        close();
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
