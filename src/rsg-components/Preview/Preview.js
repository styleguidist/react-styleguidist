// Based on https://github.com/joelburget/react-live-editor/blob/master/live-compile.jsx

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { transform } from 'babel-standalone';
import Wrapper from 'rsg-components/Wrapper';

import s from './Preview.css';

export default class Preview extends Component {
	static propTypes = {
		code: PropTypes.string.isRequired,
		evalInContext: PropTypes.func.isRequired
	};

	constructor() {
		super();
		this.state = {
			error: null
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
			presets: ['es2015', 'react', 'stage-0']
		}).code;
	}

	executeCode() {
		let mountNode = this.refs.mount;

		ReactDOM.unmountComponentAtNode(mountNode);

		this.setState({
			error: null
		});

		let { code } = this.props;
		if (!code) {
			return;
		}

		try {
			const compiledCode = this.compileCode(this.props.code);
			// initiate state and set with the callback in the bottom component;
			const initCode = `
				var initialState = {};
				${compiledCode}
				__initialStateCB(initialState);
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
			// wrap everything in a react component, such that we can leverage the state management of this component
			class PreviewComponent extends React.Component {

				constructor(props) {
					super(props);

					const state = {};
					const initialStateCB = (initialState) => {
						Object.assign(state, initialState);
					};
					const setStateError = (partialState) => {
						const err = 'Calling setState to setup the initial state is deprecated. Use\ninitialState = ';
						Object.assign(state, {error: err + JSON.stringify(partialState) + ';'});
					};
					initial({}, setStateError, initialStateCB);
					this.state = state;
				}

				render() {
					if (this.state.error) {
						return <pre className={s.playgroundError}>{this.state.error}</pre>;
					}
					const setState = (nextState, callback) => this.setState(nextState, callback);
					const state = this.state;
					// pass through props from the wrapper component
					return React.cloneElement(exampleComponent(state, setState, null), this.props);
				}
			}

			const wrappedComponent = (
				<Wrapper>
					<PreviewComponent />
				</Wrapper>
			);
			ReactDOM.render(wrappedComponent, mountNode);
		}
		catch (err) {
			ReactDOM.unmountComponentAtNode(mountNode);
			this.setState({
				error: err.toString()
			});
		}
	}

	renderError() {
		let { error } = this.state;
		if (error) {
			return (
				<pre className={s.playgroundError}>{error}</pre>
			);
		}
		else {
			return null;
		}
	}

	render() {
		return (
			<div>
				<div ref="mount"></div>
				{this.renderError()}
			</div>
		);
	}
}
