/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-vars */
import Icon from '@rsuite/icons/lib/Icon';

import React, { useState } from 'react';
import { Button, Tag, toaster, Message } from 'rsuite';

import firebase from 'firebase/compat/app';

import * as facebook from '@fortawesome/free-brands-svg-icons/faFacebookSquare';
import * as google from '@fortawesome/free-brands-svg-icons/faGoogle';

import { auth } from '../../misc/firebase';

const FaSvgIcon = ({ faIcon, ...rest }) => {
    const { width, height, svgPathData } = faIcon;
    return (
        <svg
            {...rest}
            viewBox={`0 0 ${width} ${height}`}
            width="1.5em"
            height="1.5em"
            fill="currentColor"
        >
            <path d={svgPathData} />
        </svg>
    );
};

const ProviderBlock = () => {
    const [isConnected, setIsConnected] = useState({
        'google.com': auth.currentUser.providerData.some(
            data => data.providerId === 'google.com'
        ),
        'facebook.com': auth.currentUser.providerData.some(
            data => data.providerId === 'facebook.com'
        ),
    });

    const updateIsConnected = (providerId, value) => {
        setIsConnected(p => {
            return {
                ...p,
                [providerId]: value,
            };
        });
    };

    const unlink = async providerId => {
        try {
            if (auth.currentUser.providerData.length === 1) {
                throw new Error(`You can not disconnect from ${providerId}`);
            }
            await auth.currentUser.unlink(providerId);

            updateIsConnected(providerId, false);

            toaster.push(
                <Message showIcon type="info" duration={4000}>
                    Disconnected from {providerId}
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

    const unlinkFacebook = () => {
        unlink('facebook.com');
    };
    const unlinkGoogle = () => {
        unlink('google.com');
    };

    const link = async provider => {
        try {
            await auth.currentUser.linkWithPopup(provider);
            toaster.push(
                <Message showIcon type="success" duration={4000}>
                    Linked to {provider.providerId}
                </Message>,
                { placement: 'topStart' }
            );

            updateIsConnected(provider.providerId, true);
        } catch (error) {
            toaster.push(
                <Message showIcon type="error" duration={4000}>
                    {error.message}
                </Message>,
                { placement: 'topStart' }
            );
        }
    };

    const linkFacebook = () => {
        link(new firebase.auth.FacebookAuthProvider());
    };
    const linkGoogle = () => {
        link(new firebase.auth.GoogleAuthProvider());
    };

    return (
        <div className="mt-2">
            {isConnected['google.com'] && (
                <Tag
                    color="green"
                    closable
                    onClose={unlinkGoogle}
                    className="mb-1 ml-1"
                >
                    <Icon as={FaSvgIcon} faIcon={google} /> Connected
                </Tag>
            )}{' '}
            {isConnected['facebook.com'] && (
                <Tag
                    color="blue"
                    closable
                    onClose={unlinkFacebook}
                    className="mb-1"
                >
                    <Icon as={FaSvgIcon} faIcon={facebook} /> Connected
                </Tag>
            )}
            <div className="mt-2">
                {!isConnected['google.com'] && (
                    <Button
                        block
                        color="green"
                        appearance="ghost"
                        onClick={linkGoogle}
                    >
                        <Icon as={FaSvgIcon} faIcon={google} /> Link to Google
                    </Button>
                )}
                {!isConnected['facebook.com'] && (
                    <Button
                        block
                        color="blue"
                        appearance="ghost"
                        onClick={linkFacebook}
                    >
                        <Icon as={FaSvgIcon} faIcon={facebook} /> Link to
                        Facebook
                    </Button>
                )}
            </div>
        </div>
    );
};

export default ProviderBlock;
