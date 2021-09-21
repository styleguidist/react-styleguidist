import React from 'react';
import PropTypes from 'prop-types';
export interface UsageTabButtonProps {
    name: string;
    onClick: (e: React.MouseEvent) => void;
    active?: boolean;
    props: {
        props?: any[];
        methods?: any[];
    };
}
declare const UsageTabButton: {
    (props: UsageTabButtonProps): JSX.Element | null;
    propTypes: {
        onClick: PropTypes.Validator<(...args: any[]) => any>;
        name: PropTypes.Validator<string>;
        props: PropTypes.Validator<PropTypes.InferProps<{
            props: PropTypes.Requireable<any[]>;
            methods: PropTypes.Requireable<any[]>;
        }>>;
        active: PropTypes.Requireable<boolean>;
    };
};
export default UsageTabButton;
