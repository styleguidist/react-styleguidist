// Based on https://github.com/joelburget/react-live-editor/blob/master/live-compile.jsx

import React, { PropTypes } from 'react';
import reactTools from 'react-tools';

export default React.createClass({
	displayName: 'Preview',
	propTypes: {
		code: PropTypes.string.isRequired
	},

	getInitialState() {
		return {
			error: null
		};
	},

	componentDidMount: function() {
		this.executeCode();
	},

	componentDidUpdate: function(prevProps) {
		if (this.props.code !== prevProps.code) {
			this.executeCode();
		}
	},

	compileCode: function() {
		// TODO: Babel
		return reactTools.transform(
			// '(function() {' +
				this.props.code,
			// '\n})();'
			{
				harmony: true
			}
		);
	},

	executeCode: function() {
		var mountNode = this.refs.mount.getDOMNode();

		try {
			React.unmountComponentAtNode(mountNode);
		}
		catch (e) {
		}

		this.setState({
			error: null
		});

		try {
			var compiledCode = this.compileCode();
			React.render(eval(compiledCode), mountNode);
		}
		catch (err) {
			React.unmountComponentAtNode(mountNode);
			this.setState({
				error: err.toString()
			});
		}
	},

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
	},

	render: function() {
		return (
			<div>
				<div ref="mount"></div>
				{this.renderError()}
			</div>
		);
	}
});
