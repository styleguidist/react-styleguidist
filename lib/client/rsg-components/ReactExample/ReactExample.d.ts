import { Component } from 'react';
import PropTypes from 'prop-types';
import { TransformOptions } from 'buble';
interface ReactExampleProps {
    code: string;
    evalInContext(code: string): () => any;
    onError(err: Error): void;
    compilerConfig?: TransformOptions;
}
export default class ReactExample extends Component<ReactExampleProps> {
    static propTypes: {
        code: PropTypes.Validator<string>;
        evalInContext: PropTypes.Validator<(...args: any[]) => any>;
        onError: PropTypes.Validator<(...args: any[]) => any>;
        compilerConfig: PropTypes.Requireable<object>;
    };
    shouldComponentUpdate(nextProps: ReactExampleProps): boolean;
    private getExampleComponent;
    render(): JSX.Element | null;
}
export {};
