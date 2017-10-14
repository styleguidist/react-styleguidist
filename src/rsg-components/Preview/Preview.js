import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import noop from 'lodash/noop';
import { transform } from 'buble';
import PlaygroundError from 'rsg-components/PlaygroundError';
import Wrapper from 'rsg-components/Wrapper';

/* eslint-disable react/no-multi-comp */

const compileCode = (code, config) => transform(code, config).code;

// Wrap everything in a React component to leverage the state management of this component
class PreviewComponent extends Component {
	static propTypes = {
		component: PropTypes.func.isRequired,
	};

	constructor() {
		super();
		this.state = {};
		this.setState = this.setState.bind(this);
		this.setInitialState = this.setInitialState.bind(this);
	}

	// Synchronously set initial state, so it will be ready before first render
	// Ignore all consequent calls
	setInitialState(initialState) {
		Object.assign(this.state, initialState);
		this.setInitialState = noop;
	}

	render() {
		return this.props.component(this.state, this.setState, this.setInitialState);
	}
}

export default class Preview extends Component {
	static propTypes = {
		code: PropTypes.string.isRequired,
		evalInContext: PropTypes.func.isRequired,
	};
	static contextTypes = {
		config: PropTypes.object.isRequired,
	};

	state = {
		error: null,
	};

	componentDidMount() {
		console.clear(); // eslint-disable-line no-console
		this.executeCode();
	}

	shouldComponentUpdate(nextProps, nextState) {
		return this.state.error !== nextState.error || this.props.code !== nextProps.code;
	}

	componentDidUpdate(prevProps) {
		if (this.props.code !== prevProps.code) {
			this.executeCode();
		}
	}

	componentWillUnmount() {
		this.unmountPreview();
	}

	unmountPreview() {
		if (this.mountNode) {
			ReactDOM.unmountComponentAtNode(this.mountNode);
		}
	}

	executeCode() {
		this.setState({
			error: null,
		});

		const { code } = this.props;
		if (!code) {
			return;
		}

		const compiledCode = this.compileCode(code);
		if (!compiledCode) {
			return;
		}

		const exampleComponent = this.evalInContext(compiledCode);
		const wrappedComponent = (
			<Wrapper>
				<PreviewComponent component={exampleComponent} />
			</Wrapper>
		);

		window.requestAnimationFrame(() => {
			this.unmountPreview();
			try {
				ReactDOM.render(wrappedComponent, this.mountNode);
			} catch (err) {
				this.handleError(err);
			}
		});
	}

	compileCode(code) {
		try {
			return compileCode(code, this.context.config.compilerConfig);
		} catch (err) {
			this.handleError(err);
		}
		return false;
	}

	evalInContext(compiledCode) {
		// 1. Use setter/with to call our callback function when user write `initialState = {...}`
		// 2. Wrap code in JSON.stringify/eval to catch the component and return it
		const exampleComponentCode = `
			var stateWrapper = {
				set initialState(value) {
					__setInitialState(value)
				},
			}
			with (stateWrapper) {
				return eval(${JSON.stringify(compiledCode)})
			}
		`;

		return this.props.evalInContext(exampleComponentCode);
	}

	handleError(err) {
		this.unmountPreview();

		this.setState({
			error: err.toString(),
		});

		console.error(err); // eslint-disable-line no-console
	}

	render() {
		const { error } = this.state;
		return (
			<div>
				<div ref={ref => (this.mountNode = ref)} />
				{error && <PlaygroundError message={error} />}
			</div>
		);
	}
}
