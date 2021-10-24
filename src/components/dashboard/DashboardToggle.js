/* eslint-disable arrow-body-style */
import React from 'react';

import { Dashboard } from '@rsuite/icons';

import { Button, Drawer } from 'rsuite';
import { useMediaQuery, useModalState } from '../../misc/custom-hooks';

import DashboardShow from '.';

const DashboardToggle = () => {
    const { isOpen, open, close } = useModalState();
    const isMobile = useMediaQuery('(max-width: 992px)');

    return (
        <>
            <Button block color="blue" appearance="primary" onClick={open}>
                <Dashboard /> Dashboard
            </Button>
            <Drawer
                full={isMobile}
                open={isOpen}
                onClose={close}
                placement="left"
            >
                <DashboardShow />
            </Drawer>
        </>
    );
};

export default DashboardToggle;
