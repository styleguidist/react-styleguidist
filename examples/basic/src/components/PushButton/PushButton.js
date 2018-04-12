import React from 'react';
import PropTypes from 'prop-types';

import './PushButton.css';

/**
 * An example-less button with custom display name.
 * @visibleName Push Button 🎉
 */
export default function PushButton({ color, size, children }) {
	const styles = {
		color,
		fontSize: PushButton.sizes[size],
	};

	return (
		<button className="push-button" style={styles}>
			{children}
		</button>
	);
}
PushButton.propTypes = {
	/**
	 * PushButton label.
	 */
	children: PropTypes.string.isRequired,
	color: PropTypes.string,
	size: PropTypes.oneOf(['small', 'normal', 'large']),
};
PushButton.defaultProps = {
	color: '#333',
	size: 'normal',
};
PushButton.sizes = {
	small: '10px',
	normal: '14px',
	large: '18px',
};
