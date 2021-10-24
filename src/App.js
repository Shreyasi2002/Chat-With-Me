import React from 'react';
import { Switch } from 'react-router';

import 'rsuite/dist/rsuite.min.css';
import PrivateRouter from './components/PrivateRouter';
import PublicRouter from './components/PublicRouter';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import './styles/main.scss';

function App() {
    return (
        <Switch>
            <PublicRouter path="/signin">
                <SignIn />
            </PublicRouter>
            <PrivateRouter path="/">
                <Home />
            </PrivateRouter>
        </Switch>
    );
}

export default App;
