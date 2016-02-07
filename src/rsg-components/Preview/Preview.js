// Based on https://github.com/joelburget/react-live-editor/blob/master/live-compile.jsx

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import {transform} from 'babel-standalone';
import Wrapper from 'rsg-components/Wrapper';

import s from './Preview.css';

export default class Preview extends Component {
	static propTypes = {
		code: PropTypes.string.isRequired,
		evalInContext: PropTypes.func.isRequired
	}

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

	setComponentState(newState) {
		this.componentState = {...this.componentState, ...newState};
		setTimeout(this.executeCode.bind(this), 0);
	}

	compileCode(code) {
		return transform(code, {stage: 0}).code;
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
			code = `
				const state = Object.freeze(${JSON.stringify(this.componentState)});
				${code}
			`;
			let compiledCode = this.compileCode(code);
			let component = this.props.evalInContext(compiledCode, this.setComponentState.bind(this));
			let wrappedComponent = (
				<Wrapper>
					{component}
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
