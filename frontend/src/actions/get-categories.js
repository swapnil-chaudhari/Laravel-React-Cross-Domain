import axios from 'axios';
import { disableLoadingState } from 'src/actions/loading-state';
import {
    CATEGORIES_FETCHED,
    CATEGORIES_FETCHED_FAILURE,
} from 'src/action-types';
import { APP_ENDPOINT } from 'src/constants';
import { getToken } from 'src/actions/authentication/auth.js';
import { categories } from 'src/services/urls/index.js';

// export const headers = {
//     headers: {
//         'Authorization': `Bearer  ${getToken()}`,
//     }
// };

const categoriesFetched = categories => ({
    type: CATEGORIES_FETCHED,
    payload: categories,
});

const categoriesFetchedFailure = error => ({
    type: CATEGORIES_FETCHED_FAILURE,
    payload: error,
});

export default function getCategories() {
    return (dispatch) =>
        axios.get(`${APP_ENDPOINT}${categories()}`)
        .then(response => {
            const categories = response.data.results;
            return categories;
        })
        .then(categories => {
            dispatch(categoriesFetched(categories));
            dispatch(disableLoadingState());
        })
        .catch(error => dispatch(categoriesFetchedFailure(error)));

}
