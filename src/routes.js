import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './components/App/App';
import AssetDetails from './components/AssetDetails/AssetDetails';

export default () => {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Switch>
                <Route exact path="/" render={routeProps => <App {...routeProps} />} />
                <Route path="/asset/:id" render={routeProps => <AssetDetails {...routeProps} />} />
            </Switch>
        </BrowserRouter>
    );
};