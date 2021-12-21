/// <reference types="react" />
import PropTypes from 'prop-types';
export interface IsolateButtonProps {
    name: string;
    example?: number;
    isolated?: boolean;
    href: string;
}
declare const IsolateButton: {
    ({ name, example, isolated, href }: IsolateButtonProps): JSX.Element | null;
    propTypes: {
        name: PropTypes.Validator<string>;
        example: PropTypes.Requireable<number>;
        isolated: PropTypes.Requireable<boolean>;
    };
};
export default IsolateButton;
