import React, { PropTypes } from 'react';

import './Button.css';

/**
 * The only true button.
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
	color: PropTypes.string,
	size: PropTypes.oneOf(['small', 'normal', 'large']),
	onClick: PropTypes.func,
};
Button.defaultProps = {
	color: '#333',
	size: 'normal',
	/* eslint-disable no-console */
	onClick: (evt) => {
		console.log('You have clicked me!', evt.target);
	},
	/* eslint-enable no-console */
};
Button.sizes = {
	small: '10px',
	normal: '14px',
	large: '18px',
};
