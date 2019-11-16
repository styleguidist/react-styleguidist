import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TransformOptions } from 'buble';
import Wrapper from 'rsg-components/Wrapper';
import compileCode from '../../utils/compileCode';
import splitExampleCode from '../../utils/splitExampleCode';

/* eslint-disable react/no-multi-comp */

// Wrap the example component with a Functional Component to support
// hooks in examples
function FunctionComponentWrapper(props: {
	component: (state: any, setState: (s: any) => void) => any;
	state: any;
	setState: (s: any) => void;
}) {
	const { component, state, setState } = props;

	// Return null when component doesn't render anything to avoid an error
	return component(state, setState) || null;
}

interface StateHolderProps {
	component: (state: any, setState: (s: any) => void) => any;
	initialState: Record<string, any>;
}

// Wrap everything in a React component to leverage the state management
// of this component
class StateHolder extends Component<StateHolderProps> {
	public static propTypes = {
		component: PropTypes.func.isRequired,
		initialState: PropTypes.object.isRequired,
	};

	public state = this.props.initialState;
	public setStateBinded = this.setState.bind(this);

	public render() {
		return (
			<FunctionComponentWrapper
				component={this.props.component}
				state={this.state}
				setState={this.setStateBinded}
			/>
		);
	}
}

interface ReactExampleProps {
	code: string;
	evalInContext(code: string): () => any;
	onError(err: Error): void;
	compilerConfig?: TransformOptions;
}

export default class ReactExample extends Component<ReactExampleProps> {
	public static propTypes = {
		code: PropTypes.string.isRequired,
		evalInContext: PropTypes.func.isRequired,
		onError: PropTypes.func.isRequired,
		compilerConfig: PropTypes.object,
	};

	public shouldComponentUpdate(nextProps: ReactExampleProps) {
		return this.props.code !== nextProps.code;
	}

	// Eval the code to extract the value of the initial state
	private getExampleInitialState(compiledCode: string): Record<string, any> {
		if (compiledCode.indexOf('initialState') === -1) {
			return {};
		}

		return this.props.evalInContext(`
			var state = {}, initialState = {};
			try {
				${compiledCode};
			} catch (err) {}
			return initialState;
		`)();
	}

	// Run example code and return the last top-level expression
	private getExampleComponent(compiledCode: string): () => any {
		return this.props.evalInContext(`
			var initialState = {};
			${compiledCode}
		`);
	}

	public render() {
		const { code, compilerConfig = {}, onError } = this.props;
		const compiledCode = compileCode(code, compilerConfig, onError);
		if (!compiledCode) {
			return null;
		}

		const { head, example } = splitExampleCode(compiledCode);
		const initialState = this.getExampleInitialState(head);
		const exampleComponent = this.getExampleComponent(example);
		const wrappedComponent = (
			<Wrapper onError={onError}>
				<StateHolder component={exampleComponent} initialState={initialState} />
			</Wrapper>
		);
		return wrappedComponent;
	}
}
