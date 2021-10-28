import React from 'react';
import { Route, Switch } from 'react-router';

import 'rsuite/dist/rsuite.min.css';
import PrivateRouter from './components/PrivateRouter';
import PublicRouter from './components/PublicRouter';
import { ProfileProvider } from './context/profile.context';
import Error404 from './pages/Error404';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import './styles/main.scss';

function App() {
    return (
        <ProfileProvider>
            <Switch>
                <PublicRouter exact path="/signin">
                    <SignIn />
                </PublicRouter>
                <PrivateRouter path="/">
                    <Home />
                </PrivateRouter>
                <Route>
                    <Error404 />
                </Route>
            </Switch>
        </ProfileProvider>
    );
}

export default App;
