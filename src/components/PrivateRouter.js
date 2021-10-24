/* eslint-disable arrow-body-style */
import React from 'react';
import { Redirect, Route } from 'react-router';
import { Container, Loader } from 'rsuite';
import { useProfile } from '../context/profile.context';

const PrivateRouter = ({ children, ...routeProps }) => {
    const { profile, isLoading } = useProfile();

    if (isLoading && !profile) {
        return (
            <Container>
                <Loader
                    center
                    vertical
                    size="md"
                    content="Loading"
                    speed="normal"
                />
            </Container>
        );
    }

    if (!profile && !isLoading) {
        return <Redirect to="/signin" />;
    }
    return <Route {...routeProps}>{children}</Route>;
};

export default PrivateRouter;
