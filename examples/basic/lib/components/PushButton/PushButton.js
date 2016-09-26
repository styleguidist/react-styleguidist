import React, { PropTypes } from 'react';

import s from './PushButton.css';

/**
 * An example-less button.
 */
export default function PushButton({
	color,
	size,
	children,
}) {
	let styles = {
		color,
		fontSize: PushButton.sizes[size],
	};

	return (
		<button className={s.root} style={styles}>{children}</button>
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
