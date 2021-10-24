import React from 'react';
import { Switch } from 'react-router';

import 'rsuite/dist/rsuite.min.css';
import PrivateRouter from './components/PrivateRouter';
import PublicRouter from './components/PublicRouter';
import { ProfileProvider } from './context/profile.context';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import './styles/main.scss';

function App() {
    return (
        <ProfileProvider>
            <Switch>
                <PublicRouter path="/signin">
                    <SignIn />
                </PublicRouter>
                <PrivateRouter path="/">
                    <Home />
                </PrivateRouter>
            </Switch>
        </ProfileProvider>
    );
}

export default App;
