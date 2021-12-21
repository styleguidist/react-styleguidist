import React, { Component } from 'react';
import PropTypes from 'prop-types';
interface PlaygroundProps {
    evalInContext(code: string): () => any;
    index: number;
    name?: string;
    exampleMode?: string;
    code: string;
    settings: {
        showcode?: boolean;
        noeditor?: boolean;
        padded?: boolean;
        props?: any;
    };
}
interface PlaygroundState {
    code: string;
    prevCode: string;
    activeTab?: string;
}
declare class Playground extends Component<PlaygroundProps, PlaygroundState> {
    static propTypes: {
        code: PropTypes.Validator<string>;
        evalInContext: PropTypes.Validator<(...args: any[]) => any>;
        index: PropTypes.Validator<number>;
        name: PropTypes.Validator<string>;
        exampleMode: PropTypes.Validator<string>;
        settings: PropTypes.Requireable<object>;
    };
    static defaultProps: {
        settings: {};
    };
    static contextType: React.Context<import("../Context").StyleGuideContextContents>;
    private handleChange;
    state: PlaygroundState;
    static getDerivedStateFromProps(nextProps: PlaygroundProps, prevState: PlaygroundState): {
        prevCode: string;
        code: string;
    } | null;
    componentWillUnmount(): void;
    private getInitialActiveTab;
    private handleTabChange;
    render(): JSX.Element;
}
export default Playground;
