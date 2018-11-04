import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './components/App/App';
import AssetDetails from './components/AssetDetails/AssetDetails';

export default () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route basename='/' render={routeProps => <App {...routeProps} />} />
                <Route basename='/asset/:id' render={routeProps => <AssetDetails {...routeProps} />} />
            </Switch>
        </BrowserRouter>
    );
};