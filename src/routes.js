import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './components/App/App';
import AssetDetails from './components/AssetDetails/AssetDetails';

export default () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path={process.env.PUBLIC_URL + '/'} render={routeProps => <App {...routeProps} />} />
                <Route path={process.env.PUBLIC_URL + '/asset/:id'} render={routeProps => <AssetDetails {...routeProps} />} />
            </Switch>
        </BrowserRouter>
    );
};