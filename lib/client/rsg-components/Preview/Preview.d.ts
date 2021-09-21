import React, { Component } from 'react';
import PropTypes from 'prop-types';
interface PreviewProps {
    code: string;
    evalInContext(code: string): () => any;
}
interface PreviewState {
    error: string | null;
}
export default class Preview extends Component<PreviewProps, PreviewState> {
    static propTypes: {
        code: PropTypes.Validator<string>;
        evalInContext: PropTypes.Validator<(...args: any[]) => any>;
    };
    static contextType: React.Context<import("../Context").StyleGuideContextContents>;
    private mountNode;
    state: PreviewState;
    componentDidMount(): void;
    shouldComponentUpdate(nextProps: PreviewProps, nextState: PreviewState): boolean;
    componentDidUpdate(prevProps: PreviewProps): void;
    componentWillUnmount(): void;
    unmountPreview(): void;
    private executeCode;
    private handleError;
    render(): JSX.Element;
}
export {};
