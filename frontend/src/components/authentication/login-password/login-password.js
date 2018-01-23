import React, { Component, PropTypes } from 'react';
import FormField from '../../../package/form-field/form-field';
import * as AppPropTypes from 'src/prop-types';
import { intlShape, intl } from 'react-intl';
import wrapFormatMessage from 'src/utils/wrap-format-message';
import { fieldMessages } from './i18n';


const propTypes = {
    onChange: PropTypes.func.isRequired,
    loginPassword: PropTypes.string,
    errorMessage: PropTypes.oneOfType([PropTypes.string, AppPropTypes.messageDescriptor])
};

const LoginPassword = ({
    loginPassword,
    onChange,
    errorMessage
}, {
    intl: { formatMessage: intlFormatMessage }
}) => {
    const formatMessage = wrapFormatMessage(intlFormatMessage);
    return (
        <FormField
            errorMessage={ formatMessage(errorMessage) }
            help={ formatMessage(fieldMessages.loginPassword.help) }
            isRequired
            label={ formatMessage(fieldMessages.loginPassword.label) }
            id="category-description-input"
        >

        <input
            type="password"
            className="form-control"
            onChange={ onChange }
            value={ loginPassword }
            placeholder={ formatMessage(fieldMessages.loginPassword.placeholder) }
        />
        </FormField>
    );
};

LoginPassword.propTypes = propTypes;

LoginPassword.contextTypes = {
    intl: intlShape.isRequired
};

export default LoginPassword;
