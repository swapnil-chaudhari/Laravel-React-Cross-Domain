import { saveCategory } from 'src/actions/save-category';
import {
    clearCategoryEditor,
    categorySaveError,
} from 'src/actions/category-editor';
import { reset } from 'src/actions/category-modal';
import { clearCategoryState } from 'src/actions/clear-category-state';
import getCategories from 'src/actions/get-categories';
import categorySchema from 'src/actions/data/category-schema.json';
import { toCamel } from 'src/utils/object-keys';
import { getErrors } from 'src/utils/error-handling';
import omit from 'lodash.omit';
import { ERROR_CODES } from 'src/constants';
import { enableLoadingState } from 'src/actions/loading-state';

export const validateAndSaveCategory = () => (dispatch, getState) => {

    const {
        category: categoryToUpdate,
        categoryEditor: { categoryEdits }
    } = getState();

    const categoryToSave = {
        ...categoryToUpdate,
        ...categoryEdits
    };

    let categoryToValidate = omit(categoryToSave, [
        'id'
    ])
    let schema;
    schema = toCamel(categorySchema);

    const errors = getErrors(categoryToValidate, schema);

    if (errors) {
        return dispatch(categorySaveError(
            errors,
            ERROR_CODES.VALIDATION_ERROR
        ));
    }

    return dispatch(saveCategory(categoryToSave))
        .then((savedCategory) => {
            // console.log('savedCategory');
            // console.log(savedCategory);
            dispatch(clearCategoryEditor());
            dispatch(clearCategoryState());
            dispatch(reset());
            dispatch(enableLoadingState());
            dispatch(getCategories());
        })
        .catch((err) => {
            console.log(err.response);
            dispatch(categorySaveError(err.response.data.results, err.response.status));
        });
}
