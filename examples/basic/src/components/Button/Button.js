import React from 'react';
import PropTypes from 'prop-types';

import './Button.css';

/**
 * The only true button.
 *
 * @version 1.0.1
 * @author [@sapegin](https://github.com/sapegin)
 */
export default function Button({
	color,
	size,
	onClick,
	children,
}) {
	const styles = {
		color,
		fontSize: Button.sizes[size],
	};

	return (
		<button className="button" style={styles} onClick={onClick}>{children}</button>
	);
}
Button.propTypes = {
	/**
	 * Button label.
	 */
	children: PropTypes.string.isRequired,
	/**
	 * The color for the button
	 *
	 * @see Check [Wikipedia](https://en.wikipedia.org/wiki/Web_colors#HTML_color_names) for a list of color names
	 */
	color: PropTypes.string,
	/**
	 * The size of the Button
	 *
	 * @since Version 1.0.1
	 */
	size: PropTypes.oneOf(['small', 'normal', 'large']),

	/**
	 * The width of the button
	 *
	 * @deprecated Do not use! Use size instead!
	 */
	width: PropTypes.number,

	/**
	 * Gets called when the user clicks on the button
	 *
	 * @param { SyntheticEvent } event The react `SyntheticEvent`
	 */
	onClick: PropTypes.func,

	/**
	 * A prop that should not be visible in the doc.
	 * @ignore
	 */
	ignoredProp: PropTypes.bool,
};
Button.defaultProps = {
	color: '#333',
	size: 'normal',
	/* eslint-disable no-console */
	onClick: (event) => {
		console.log('You have clicked me!', event.target);
	},
	/* eslint-enable no-console */
};
Button.sizes = {
	small: '10px',
	normal: '14px',
	large: '18px',
};
