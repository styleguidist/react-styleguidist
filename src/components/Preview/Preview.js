// Based on https://github.com/joelburget/react-live-editor/blob/master/live-compile.jsx

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import reactTools from 'react-tools';

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
		return reactTools.transform(
			// '(function() {' +
				this.props.code,
			// '\n})();'
			{
				harmony: true
			}
		);
	}

	executeCode() {
		var mountNode = this.refs.mount;

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
			var compiledCode = this.compileCode();
			ReactDOM.render(eval(compiledCode), mountNode);  /* eslint no-eval:0 */
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
				<div className="playgroundError">{error}</div>
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
