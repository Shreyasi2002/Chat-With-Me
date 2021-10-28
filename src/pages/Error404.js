/* eslint-disable arrow-body-style */
import { Icon } from '@rsuite/icons';
import React from 'react';

import { FaHome } from 'react-icons/fa';

import { Button, Col, Container, Grid, Panel, Row } from 'rsuite';

import ERROR from '../images/404.png';

const Error404 = () => {
    return (
        <Container>
            <Grid className="mt-page">
                <Row>
                    <Col xs={24} md={12} mdOffset={6}>
                        <Panel>
                            <img
                                src={ERROR}
                                alt="404"
                                style={{
                                    padding: 0,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    // alignSelf: 'center',
                                }}
                                className="mt-page h-100"
                            />
                            <br />
                            <div className="text-center">
                                <h4>Looks like you&apos;ve got lost...</h4>
                                <p>
                                    The page you are looking for doesn&apos;t
                                    exist or has been moved ......
                                </p>
                            </div>
                            <br />

                            <div className="mt-3">
                                <Button
                                    color="blue"
                                    appearance="primary"
                                    block
                                    href="/"
                                >
                                    <Icon as={FaHome} size="1.2em" /> Go Back
                                </Button>
                            </div>
                        </Panel>
                    </Col>
                </Row>
            </Grid>
        </Container>
    );
};

export default Error404;
