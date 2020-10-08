import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './Box.module.css';

export const Box = ({ children, textAlign, className, as: Component = 'div', ...rest }) => (
	<Component
		className={clsx(styles.box, textAlign && styles[`box--textAlign-${textAlign}`], className)}
		{...rest}
	>
		{children}
	</Component>
);

Box.propTypes = {
	children: PropTypes.node,
	textAlign: PropTypes.oneOf(['center']),
	className: PropTypes.string,
	as: PropTypes.string,
};
