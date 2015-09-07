import React, { PropTypes } from 'react';

export default React.createClass({
	displayName: 'Button',
	propTypes: {
		children: PropTypes.string.isRequired,
		color: PropTypes.string,
		size: PropTypes.oneOf(['small', 'normal', 'large']),
	},
	sizes: {
		small: '14px',
		normal: '18px',
		large: '24px'
	},

	getDefaultProps() {
		return {
			color: 'black',
			size: 'normal'
		};
	},

	render() {
		let styles = {
			color: this.props.color,
			fontSize: this.sizes[this.props.size]
		};

		return (
			<button style={styles}>{this.props.children}</button>
		);
	}
});
