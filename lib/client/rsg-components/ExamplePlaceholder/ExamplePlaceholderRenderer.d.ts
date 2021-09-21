import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { JssInjectedProps } from 'rsg-components/Styled';
interface ExamplePlaceholderProps extends JssInjectedProps {
    name?: string;
}
export declare class ExamplePlaceholderRenderer extends Component<ExamplePlaceholderProps> {
    static propTypes: {
        classes: PropTypes.Validator<{
            [x: string]: string;
        }>;
        name: PropTypes.Requireable<string>;
    };
    state: {
        isVisible: boolean;
    };
    handleOpen: () => void;
    render(): JSX.Element;
}
declare const _default: React.ComponentType<Pick<ExamplePlaceholderProps, "name">>;
export default _default;
