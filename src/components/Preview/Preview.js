// Based on https://github.com/joelburget/react-live-editor/blob/master/live-compile.jsx

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import reactTools from 'react-tools';
import Wrapper from 'components/Wrapper';

import s from './Preview.css';

export default class Preview extends Component {
	static propTypes = {
		code: PropTypes.string.isRequired
	}

	constructor() {
		super();
		this.state = {
			error: null
		};
	}

	componentDidMount() {
		this.executeCode();
	}

	componentDidUpdate(prevProps) {
		if (this.props.code !== prevProps.code) {
			this.executeCode();
		}
	}

	compileCode() {
		// TODO: Babel
		return reactTools.transform(this.props.code, {
			harmony: true
		});
	}

	executeCode() {
		let mountNode = this.refs.mount;

		try {
			ReactDOM.unmountComponentAtNode(mountNode);
		}
		finally {
			/* */
		}

		this.setState({
			error: null
		});

		try {
			let compiledCode = this.compileCode();
			let component = eval(compiledCode);  /* eslint no-eval:0 */
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
				<div className={s.playgroundError}>{error}</div>
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
