import axios from 'axios';
import { APP_ENDPOINT } from 'src/constants';
import { USER_FETCHED, USER_FETCHED_FAILURE } from 'src/action-types';
import { loggedInUser } from 'src/services/urls/index.js';

const userFetched = user => ({
    type: USER_FETCHED,
    user
});

const userFetchedFailure = error => ({
    type: USER_FETCHED_FAILURE,
    payload: error
});

export const getLoggedInUser = () => {
    return (dispatch) =>
        axios.get(`${APP_ENDPOINT}${loggedInUser()}`)
        .then(response => {
            dispatch(userFetched(response.data.results));
        })
        .catch(error => dispatch(userFetchedFailure(error)));
};
