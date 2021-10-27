/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import { Icon } from '@rsuite/icons';

import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import { Col, Grid, Row } from 'rsuite';

import { GiChatBubble } from 'react-icons/gi';

import Sidebar from '../components/Sidebar';
import { RoomsProvider } from '../context/rooms.context';
import { useMediaQuery } from '../misc/custom-hooks';
import Chat from './Home/Chat';

import START_IMAGE from '../images/ChatWithMe.png';

const Home = () => {
    const isDesktop = useMediaQuery('(min-width: 992px)');
    const { isExact } = useRouteMatch();

    const canRenderSidebar = isDesktop || isExact;

    return (
        <RoomsProvider>
            <Grid fluid className="h-100">
                <Row className="h-100">
                    {canRenderSidebar && (
                        <Col xs={24} md={9} className="h-100">
                            <Sidebar />
                        </Col>
                    )}

                    <Switch>
                        <Route exact path="/chat/:chatId">
                            <Col xs={24} md={15} className="h-100">
                                <Chat />
                            </Col>
                        </Route>
                        <Route>
                            {isDesktop && (
                                <Col xs={24} md={15} className="h-100">
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <img
                                            src={START_IMAGE}
                                            alt="start"
                                            className="mt-page shadow"
                                        />
                                    </div>
                                    <br />
                                    <h4
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            textAlign: 'center',
                                            fontFamily: 'fantasy',
                                        }}
                                    >
                                        <b>
                                            Join a Chat Room Now
                                            <br />
                                            OR
                                            <br />
                                            Create Your Own
                                        </b>
                                    </h4>
                                </Col>
                            )}
                        </Route>
                    </Switch>
                </Row>
            </Grid>
        </RoomsProvider>
    );
};

export default Home;
