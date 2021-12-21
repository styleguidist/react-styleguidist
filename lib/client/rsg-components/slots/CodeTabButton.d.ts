/// <reference types="react" />
import PropTypes from 'prop-types';
declare const CodeTabButton: {
    (props: any): JSX.Element;
    propTypes: {
        onClick: PropTypes.Validator<(...args: any[]) => any>;
        name: PropTypes.Validator<string>;
        active: PropTypes.Requireable<boolean>;
    };
};
export default CodeTabButton;
