import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Button.css';

/**
 * The only true button.
 */
export default class Button extends Component {
	static contextTypes = {
		currentTheme: PropTypes.string,
	};

	render() {
		const { color, size, onClick, disabled, children } = this.props;

		const styles = {
			color,
			fontSize: Button.sizes[size],
		};

		return (
			<button
				className={`button button--${this.context.currentTheme}`}
				style={styles}
				onClick={onClick}
				disabled={disabled}
			>
				{children}
			</button>
		);
	}
}

Button.propTypes = {
	/** Button label */
	children: PropTypes.node.isRequired,
	/** The theme for the button */
	theme: PropTypes.string,
	/** The color for the button */
	color: PropTypes.string,
	/** The size of the button */
	size: PropTypes.oneOf(['small', 'normal', 'large']),
	/** Disable button */
	disabled: PropTypes.bool,
	/** Gets called when the user clicks on the button */
	onClick: PropTypes.func,
};
Button.defaultProps = {
	size: 'normal',
	onClick: event => {
		// eslint-disable-next-line no-console
		console.log('You have clicked me!', event.target);
	},
};
Button.sizes = {
	small: '10px',
	normal: '14px',
	large: '18px',
};
