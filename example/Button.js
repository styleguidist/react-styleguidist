import React, { PropTypes } from 'react';

import s from './Button.styles.css';

export default React.createClass({
	displayName: 'Button',
	propTypes: {
		/**
		 * Button label.
		 */
		children: PropTypes.string.isRequired,
		color: PropTypes.string,
		size: PropTypes.oneOf(['small', 'normal', 'large']),
	},
	sizes: {
		small: '10px',
		normal: '14px',
		large: '18px'
	},

	getDefaultProps() {
		return {
			color: '#333',
			size: 'normal'
		};
	},

	render() {
		let styles = {
			color: this.props.color,
			fontSize: this.sizes[this.props.size]
		};

		return (
			<button className={s.root} style={styles}>{this.props.children}</button>
		);
	}
});
