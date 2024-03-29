import React, { Component, PropTypes } from 'react';
import { deleteCategory } from 'src/actions/delete-category';
import DeleteConfirmationModal from '../delete-confirmation-modal/delete-confirmation-modal';
import { deleteConfirmationMessages } from './i18n';
import { opened } from 'src/actions/category-modal';
import { categoryUpdated } from 'src/actions/save-category';
import isEmpty from 'lodash.isempty';

class Categories extends Component {
    static propTypes = {
        header: PropTypes.array,
        rows: PropTypes.array,
        dispatch: PropTypes.func,
    };

    state = {
        categoryToDelete: 0,
        showConfirmationModal: false,
        deleteCategoryInProgress: false
    }

    handleCancelDeleteCategory = () => {
        this.setState({ showConfirmationModal: false });
        return null;
    };

    handleDeleteCategory = () => {
        const { dispatch } = this.props;
        const { categoryToDelete } = this.state;
        this.setState({showConfirmationModal: false });
        return dispatch(deleteCategory(categoryToDelete));
    };

    handleDeleteCategoryConfirm = id => {
        this.setState({ categoryToDelete: id });
        this.setState({showConfirmationModal: true });
        return null;
    };

    handleUpdateCategory = category => {
        const { dispatch } = this.props;
        dispatch(categoryUpdated(category));
        dispatch(opened());
    }

    render() {
        const {
            header,
            rows,
            dispatch
        } = this.props;

        const {
            showConfirmationModal,
            deleteCategoryInProgress
         } = this.state;


        return (
            <div className="box-body">
                <form className="CategoryForm">
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                {
                                    header.map((col) =>
                                        <th key={ col }>{ col }</th>
                                    )
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                !isEmpty(rows) ?
                                    rows.map((row, index) =>
                                        <tr
                                            key={ row.id }
                                        >
                                            <td key= { row.id }>{ row.id }</td>
                                            <td key= { row.categoryTitle }>{ row.categoryTitle }</td>
                                            <td key= { row.categoryDescription }>{ row.categoryDescription }</td>
                                            <td>
                                                <a
                                                    href="javascript:void(0)"
                                                    className="btn btn-warning btn-formatter btn-sm btn-actions glyphicon glyphicon-pencil btn-icon"
                                                    onClick={ this.handleUpdateCategory.bind(this, row) }
                                                >
                                                    <span>EDIT</span>
                                                </a>

                                                <a
                                                    href="javascript:void(0)"
                                                    className="btn btn-danger btn-formatter btn-sm btn-actions glyphicon glyphicon-trash btn-icon"
                                                    onClick={ this.handleDeleteCategoryConfirm.bind(this, row.id) }
                                                >
                                                    <span>DELETE</span>
                                                </a>
                                            </td>

                                        </tr>
                                    )
                                    :
                                    'No Categories Found.'
                            }
                        </tbody>
                    </table>
                   { showConfirmationModal &&
                        <DeleteConfirmationModal
                            isOpen={ showConfirmationModal }
                            onCancel={ this.handleCancelDeleteCategory }
                            onConfirmation={ this.handleDeleteCategory }
                            deleteInProgress={ deleteCategoryInProgress }
                            messages={ {
                                header: { ...deleteConfirmationMessages.header },
                                main: deleteConfirmationMessages.main
                            } }
                        />
                }
                </form>
            </div>
        );
    }
}

export default Categories;
