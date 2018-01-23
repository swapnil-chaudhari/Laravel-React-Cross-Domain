import React, { PropTypes } from 'react';
import { Router, Route } from 'react-router';
import Category from './components/category/category';
import Dashboard from './components/dashboard/dashboard';
import Login from './components/authentication/login';
import { enableLoadingState } from './actions/loading-state';

const Routes = ({ dispatch, history }) => (
        <Router history={ history }>
            <Route>
                <Route
                    path="/"
                    component={ Login }
                    onEnter={ (replace, done) => {
                        dispatch(enableLoadingState());
                        done();
                    } }
                />
                <Route
                    path="/dashboard"
                    component={ Dashboard }
                    onEnter={ (replace, done) => {
                        dispatch(enableLoadingState());
                        done();
                    } }
                />
                <Route
                    path="/categories"
                    component={ Category }
                    onEnter={ (replace, done) => {
                        dispatch(enableLoadingState());
                        done();
                    } }
                />
            </Route>
        </Router>
);

Routes.propTypes = {
    history: PropTypes.object
};

export default Routes;
