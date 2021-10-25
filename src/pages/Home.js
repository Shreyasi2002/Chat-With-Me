/* eslint-disable arrow-body-style */
import React from 'react';
import { Col, Grid, Row } from 'rsuite';

import Sidebar from '../components/Sidebar';

const Home = () => {
    return (
        <Grid fluid className="h-100">
            <Row className="h-100">
                <Col xs={24} md={9} className="h-100">
                    <Sidebar />
                </Col>
            </Row>
        </Grid>
    );
};

export default Home;
