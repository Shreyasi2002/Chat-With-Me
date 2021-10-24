import React from 'react';
import { Redirect, Route } from 'react-router';
import { Container, Loader } from 'rsuite';

import { useProfile } from '../context/profile.context';

const PublicRouter = ({ children, ...routeProps }) => {
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

    if (profile && !isLoading) {
        return <Redirect to="/" />;
    }
    return <Route {...routeProps}>{children}</Route>;
};

export default PublicRouter;
