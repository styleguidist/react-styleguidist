import React, { PropTypes } from 'react';

export default React.createClass({
	displayName: 'Hello',
	propTypes: {
		color: PropTypes.string,
		text: PropTypes.string
	},

	getDefaultProps() {
		return {
			color: 'blue',
			text: 'Hello React!'
		};
	},

	render() {
		return (
			<h1 style={{color: this.props.color}}>{this.props.text}</h1>
		);
	}
});
