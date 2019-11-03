import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Wrapper from 'rsg-components/Wrapper';
import compileCode from '../../utils/compileCode';
import splitExampleCode from '../../utils/splitExampleCode';

/* eslint-disable react/no-multi-comp */

// Wrap the example component with a Functional Component to support
// hooks in examples
function FunctionComponentWrapper(props) {
	const { component, state, setState } = props;

	// Return null when component doesn't render anything to avoid an error
	return component(state, setState) || null;
}

// Wrap everything in a React component to leverage the state management
// of this component
class StateHolder extends Component {
	static propTypes = {
		component: PropTypes.func.isRequired,
		initialState: PropTypes.object.isRequired,
	};

	state = this.props.initialState;
	setStateBinded = this.setState.bind(this);

	render() {
		return (
			<FunctionComponentWrapper
				component={this.props.component}
				state={this.state}
				setState={this.setStateBinded}
			/>
		);
	}
}

export default class ReactExample extends Component {
	static propTypes = {
		code: PropTypes.string.isRequired,
		evalInContext: PropTypes.func.isRequired,
		onError: PropTypes.func.isRequired,
		compilerConfig: PropTypes.object,
	};

	shouldComponentUpdate(nextProps) {
		return this.props.code !== nextProps.code;
	}

	// Eval the code to extract the value of the initial state
	getExampleInitialState(compiledCode) {
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
	getExampleComponent(compiledCode) {
		return this.props.evalInContext(`
			var initialState = {};
			${compiledCode}
		`);
	}

	render() {
		const { code, compilerConfig, onError } = this.props;
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
