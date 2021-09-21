import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { JssInjectedProps } from 'rsg-components/Styled';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
export interface EditorProps extends JssInjectedProps {
    code: string;
    onChange: (code: string) => void;
}
interface EditorState {
    code: string;
    prevCode: string;
}
export declare class Editor extends Component<EditorProps> {
    static propTypes: {
        code: PropTypes.Validator<string>;
        onChange: PropTypes.Validator<(...args: any[]) => any>;
        classes: PropTypes.Validator<{
            [x: string]: string;
        }>;
    };
    state: {
        code: string;
        prevCode: string;
    };
    static getDerivedStateFromProps(nextProps: EditorProps, prevState: EditorState): {
        prevCode: string;
        code: string;
    } | null;
    shouldComponentUpdate(nextProps: EditorProps, nextState: EditorState): boolean;
    private handleChange;
    render(): JSX.Element;
}
declare const _default: React.ComponentType<Pick<EditorProps, "code" | "onChange">>;
export default _default;
