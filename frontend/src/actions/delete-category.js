import axios from 'axios';
import { clearCategoryState } from 'src/actions/clear-category-state';
import getCategories from 'src/actions/get-categories';
import { APP_ENDPOINT } from 'src/constants';
import { enableLoadingState } from 'src/actions/loading-state';
import { categories } from 'src/services/urls/index.js';

export const deleteCategory = id => dispatch => {
    return axios.delete(`${APP_ENDPOINT}${categories()}/${id}`).then((response) => {
        dispatch(clearCategoryState());
        dispatch(enableLoadingState());

        return dispatch(getCategories());
    });
};
