/* eslint-disable arrow-body-style */
import Icon from '@rsuite/icons/lib/Icon';
import React from 'react';

import * as facebook from '@fortawesome/free-brands-svg-icons/faFacebookSquare';
import * as google from '@fortawesome/free-brands-svg-icons/faGoogle';
import * as email from '@fortawesome/free-solid-svg-icons/faEnvelope';

import { Button, Col, Container, Grid, Panel, Row } from 'rsuite';

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
    return (
        <Container>
            <Grid>
                <Row>
                    <Col xs={24} md={12} mdOffset={6}>
                        <Panel>
                            <div className="text-center">
                                <h2>Welcome to ChatWithMe</h2>
                                <p>Progressive Chat Platform for ...</p>
                            </div>
                            <br />

                            <div>
                                <Button appearance="ghost" block>
                                    <Icon as={FaSvgIcon} faIcon={email} />{' '}
                                    Continue with Email/Password
                                </Button>
                                <Button color="blue" appearance="primary" block>
                                    <Icon as={FaSvgIcon} faIcon={facebook} />{' '}
                                    Continue with Facebook
                                </Button>
                                <Button
                                    color="green"
                                    appearance="primary"
                                    block
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
