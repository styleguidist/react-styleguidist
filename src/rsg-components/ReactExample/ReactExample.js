import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { transform } from 'buble';
import Wrapper from 'rsg-components/Wrapper';
import splitExampleCode from '../../utils/splitExampleCode';

/* eslint-disable no-invalid-this, react/no-multi-comp */

const FragmentTag = React.Fragment ? 'React.Fragment' : 'div';

const compileCode = (code, config) => transform(code, config).code;
const wrapCodeInFragment = code => `<${FragmentTag}>${code}</${FragmentTag}>;`;

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
		return this.props.component(this.state, this.setStateBinded);
	}
}

export default class ReactExample extends Component {
	static propTypes = {
		code: PropTypes.string.isRequired,
		evalInContext: PropTypes.func.isRequired,
		onError: PropTypes.func.isRequired,
		compilerConfig: PropTypes.object,
	};
	static contextTypes = {};

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

	compileCode(code) {
		try {
			const wrappedCode = code.trim().match(/^</) ? wrapCodeInFragment(code) : code;
			return compileCode(wrappedCode, this.props.compilerConfig);
		} catch (err) {
			if (this.props.onError) {
				this.props.onError(err);
			}
		}
		return false;
	}

	render() {
		const compiledCode = this.compileCode(this.props.code);
		if (!compiledCode) {
			return null;
		}

		const { head, example } = splitExampleCode(compiledCode);
		const initialState = this.getExampleInitialState(head);
		const exampleComponent = this.getExampleComponent(example);
		const wrappedComponent = (
			<Wrapper onError={this.props.onError}>
				<StateHolder component={exampleComponent} initialState={initialState} />
			</Wrapper>
		);
		return wrappedComponent;
	}
}
