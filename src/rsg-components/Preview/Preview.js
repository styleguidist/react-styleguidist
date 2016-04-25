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
			let compiledCode = this.compileCode(this.props.code);

			// the code contains the setup of the state and the react component to render.
			// we split the setup of the state and the react component, since calling setState
			// in render is not allowed.

			const splitIndex = compiledCode.indexOf('React.createElement');

			// evalInContext returns a function which takes state and setState and returns the evaluated code
			const initState = this.props.evalInContext(compiledCode.substring(0, splitIndex));
			const render = this.props.evalInContext('return ' + compiledCode.substring(splitIndex));

			// wrap everything in a react component, such that we can leverage the state management of this component
			class PreviewComponent extends React.Component {

				componentWillMount() {
					// use the autobinding of arrow functions 
					const setState = partialState => this.setState(partialState);
					const state = this.state;
					initState(state, setState);
				}

				render() {
					const setState = partialState => this.setState(partialState);
					const state = this.state;
					// pass through props form the wrapper component
					return React.cloneElement(render(state, setState), this.props);
				}
			}

			let wrappedComponent = (
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
