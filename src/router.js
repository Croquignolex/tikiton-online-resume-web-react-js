import React from 'react';
import PropTypes from "prop-types";
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import {HOME_PAGE_PATH} from "./helpers/constants";
import asyncComponent from './helpers/asyncComponent';

// Component
function AppRoutes({history}) {
    return (
        <ConnectedRouter history={history}>
            <Switch>
                {/* Available pages on guest mode */}
                <Route  exact
                        path={HOME_PAGE_PATH}
                        component={asyncComponent(() => import('./pages/HomePage'))}
                />
                {/* 404 page */}
                <Route component={asyncComponent(() => import('./pages/error/NotFoundPage'))} />
            </Switch>
        </ConnectedRouter>
    );
}

// Prop types to ensure destroyed props data type
AppRoutes.propTypes = {
    history: PropTypes.object.isRequired,
};

export default React.memo(AppRoutes);
