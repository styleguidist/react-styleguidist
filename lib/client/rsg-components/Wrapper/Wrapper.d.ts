import { Component } from 'react';
import PropTypes from 'prop-types';
export default class Wrapper extends Component<{
    onError: (e: Error) => void;
}> {
    static propTypes: {
        children: PropTypes.Validator<string | number | boolean | {} | PropTypes.ReactElementLike | PropTypes.ReactNodeArray>;
        onError: PropTypes.Validator<(...args: any[]) => any>;
    };
    componentDidCatch(error: Error): void;
    render(): import("react").ReactNode;
}
