import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './Stack.module.css';

export const Stack = ({ children, gap, className, as: Component = 'div', ...rest }) => (
	<Component className={clsx(styles.stack, styles[`stack--${gap}`], className)} {...rest}>
		{children}
	</Component>
);

Stack.propTypes = {
	children: PropTypes.node.isRequired,
	gap: PropTypes.oneOf(['xxs', 'xs', 's', 'm', 'l', 'xl']).isRequired,
	className: PropTypes.string,
	as: PropTypes.string,
};
