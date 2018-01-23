import axios from 'axios';
import { CATEGORY_UPDATED } from 'src/action-types';
import { APP_ENDPOINT } from 'src/constants';
import { getToken } from 'src/actions/authentication/auth.js';
import { categories } from 'src/services/urls/index.js';

export const categoryUpdated = category => ({
    type: CATEGORY_UPDATED,
    category
});

const sendCategory = category => {
    if (!category.id) {
        return axios.post(`${APP_ENDPOINT}${categories()}`, category);
    }

    return axios.put(`${APP_ENDPOINT}${categories()}/${category.id}`, category);
}

export const saveCategory = category => dispatch => {
    return sendCategory(category)
    .then((response) => {
        // let updatedCategory = response.data.results;
        console.log(category);
        dispatch(categoryUpdated(category));
        return category;
    });
};