/* eslint-disable arrow-body-style */
import Icon from '@rsuite/icons/lib/Icon';
import React from 'react';

import firebase from 'firebase/compat/app';

import * as facebook from '@fortawesome/free-brands-svg-icons/faFacebookSquare';
import * as google from '@fortawesome/free-brands-svg-icons/faGoogle';
import * as email from '@fortawesome/free-solid-svg-icons/faEnvelope';

import {
    Button,
    Col,
    Container,
    Grid,
    Message,
    Panel,
    Row,
    toaster,
} from 'rsuite';
import { auth, database } from '../misc/firebase';

const FaSvgIcon = ({ faIcon, ...rest }) => {
    const { width, height, svgPathData } = faIcon;
    return (
        <svg
            {...rest}
            viewBox={`0 0 ${width} ${height}`}
            width="2em"
            height="2em"
            fill="currentColor"
        >
            <path d={svgPathData} />
        </svg>
    );
};

const SignIn = () => {
    const signInWithProvider = async provider => {
        try {
            const { additionalUserInfo, user } = await auth.signInWithPopup(
                provider
            );
            if (additionalUserInfo.isNewUser) {
                database.ref(`/profiles/${user.uid}`).set({
                    name: user.displayName,
                    createdAt: firebase.database.ServerValue.TIMESTAMP,
                });
            }

            toaster.push(
                <Message showIcon type="success" duration={4000}>
                    Success : Signed In Successfully
                </Message>
            );
        } catch (err) {
            toaster.push(
                <Message showIcon type="warning" duration={4000}>
                    {err.message}
                </Message>
            );
        }
    };

    const onFacebookSignIn = () => {
        signInWithProvider(new firebase.auth.FacebookAuthProvider());
    };
    const onGoogleSignIn = () => {
        signInWithProvider(new firebase.auth.GoogleAuthProvider());
    };
    const onEmailSignIn = () => {
        signInWithProvider(new firebase.auth.EmailAuthProvider());
    };

    return (
        <Container>
            <Grid className="mt-page">
                <Row>
                    <Col xs={24} md={12} mdOffset={6}>
                        <Panel>
                            <div className="text-center">
                                <h2>Welcome to ChatWithMe</h2>
                                <p>Progressive Chat Platform for ...</p>
                            </div>

                            <div className="mt-3">
                                <Button
                                    appearance="ghost"
                                    block
                                    onClick={onEmailSignIn}
                                >
                                    <Icon as={FaSvgIcon} faIcon={email} />{' '}
                                    Continue with Email/Password
                                </Button>
                                <Button
                                    color="blue"
                                    appearance="primary"
                                    block
                                    onClick={onFacebookSignIn}
                                >
                                    <Icon as={FaSvgIcon} faIcon={facebook} />{' '}
                                    Continue with Facebook
                                </Button>
                                <Button
                                    color="green"
                                    appearance="primary"
                                    block
                                    onClick={onGoogleSignIn}
                                >
                                    <Icon as={FaSvgIcon} faIcon={google} />{' '}
                                    Continue with Google
                                </Button>
                            </div>
                        </Panel>
                    </Col>
                </Row>
            </Grid>
        </Container>
    );
};

export default SignIn;
