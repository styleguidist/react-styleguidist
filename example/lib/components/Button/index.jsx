import React, { PropTypes } from 'react';

import s from './Button.css';

/**
 * The only true button.
 */
function Button({
	color,
	size,
	children,
	onClick
}) {
	let styles = {
		color: color,
		fontSize: Button.sizes[size]
	};

	return (
		<button className={s.root} style={styles} onClick={onClick}>{children}</button>
	);
}

Button.propTypes = {
	/** Label */
	children: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	color: PropTypes.string,
	size: PropTypes.oneOf(['small', 'normal', 'large']),
	/** Callback */
	onClick: PropTypes.func
};

Button.defaultProps = {
	color: '#333',
	size: 'normal'
};

Button.sizes = {
	small: '10px',
	normal: '14px',
	large: '18px'
};

export default Button;
