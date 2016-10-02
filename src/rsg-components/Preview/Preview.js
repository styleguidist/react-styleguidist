// Based on https://github.com/joelburget/react-live-editor/blob/master/live-compile.jsx

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { transform } from 'babel-standalone';
import PlaygroundError from 'rsg-components/PlaygroundError';
import Wrapper from 'rsg-components/Wrapper';

// TODO: extract compiler to a separate module

export default class Preview extends Component {
	static propTypes = {
		code: PropTypes.string.isRequired,
		evalInContext: PropTypes.func.isRequired,
	};

	constructor() {
		super();
		this.state = {
			error: null,
		};
		this.componentState = {};
	}

	componentDidMount() {
		this.executeCode();
	}

	componentDidUpdate(prevProps) {
		if (this.props.code !== prevProps.code) {
			this.executeCode();
		}
	}

	compileCode(code) {
		return transform(code, {
			presets: ['es2015', 'react', 'stage-0'],
		}).code;
	}

	executeCode() {
		ReactDOM.unmountComponentAtNode(this.mountNode);

		this.setState({
			error: null,
		});

		let { code } = this.props;
		if (!code) {
			return;
		}

		try {
			const compiledCode = this.compileCode(this.props.code);

			// Initiate state and set with the callback in the bottom component;
			// Workaround for https://github.com/sapegin/react-styleguidist/issues/155 - missed props on first render
			// when using initialState
			const initCode = `
				var React = {};  // React.createElement will throw on first load
				var initialState = {};
				try {
					${compiledCode}
				}
				catch (e) {
					// Ignoring
				}
				finally {
					__initialStateCB(initialState);
				}
			`;

			// evalInContext returns a function which takes state, setState and a callback to handle the
			// initial state and returns the evaluated code
			const initial = this.props.evalInContext(initCode);

			// 1) setup initialState so that we don't get an error;
			// 2) use require data or make other setup for the example component;
			// 3) return the example component
			const exampleComponentCode = `
				var initialState = {};
				return eval(${JSON.stringify(compiledCode)});
			`;

			const exampleComponent = this.props.evalInContext(exampleComponentCode);

			// Wrap everything in a react component to leverage the state management of this component
			class PreviewComponent extends Component { // eslint-disable-line react/no-multi-comp
				constructor() {
					super();

					const state = {};
					const initialStateCB = (initialState) => {
						Object.assign(state, initialState);
					};
					const setStateError = (partialState) => {
						const err = 'Calling setState to setup the initial state is deprecated. Use\ninitialState = ';
						Object.assign(state, { error: err + JSON.stringify(partialState) + ';' });
					};

					initial({}, setStateError, initialStateCB);
					this.state = state;
				}

				render() {
					const { error } = this.state;
					if (error) {
						return <PlaygroundError message={error} />;
					}

					return exampleComponent(this.state, this.setState.bind(this), null);
				}
			}

			const wrappedComponent = (
				<Wrapper>
					<PreviewComponent />
				</Wrapper>
			);

			ReactDOM.render(wrappedComponent, this.mountNode);
		}
		catch (err) {
			ReactDOM.unmountComponentAtNode(this.mountNode);
			this.setState({
				error: err.toString(),
			});
		}
	}

	render() {
		const { error } = this.state;
		return (
			<div>
				<div ref={ref => (this.mountNode = ref)}></div>
				{error && <PlaygroundError message={error} />}
			</div>
		);
	}
}
