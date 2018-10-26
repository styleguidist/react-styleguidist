import React from 'react';
import PropTypes from 'prop-types';

/**
 * The only true label.
 */
export default function Label({ color, background, children }) {
	const styles = {
		color,
		background,
		padding: '.5em 1em',
		borderRadius: '0.3em',
		fontFamily: 'arial',
	};

	return <label style={styles}>{children}</label>;
}
Label.propTypes = {
	/**
	 * Label text.
	 */
	children: PropTypes.string.isRequired,
	color: PropTypes.string,
	background: PropTypes.string,
};
Label.defaultProps = {
	color: '#333',
	background: 'white',
};
