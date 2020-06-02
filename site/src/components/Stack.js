import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './Stack.module.css';

export const Stack = ({
	children,
	gap,
	className,
	as: Component = 'div',
	...rest
}) => (
	<Component
		className={classnames(styles.stack, styles[`stack--${gap}`], className)}
		{...rest}
	>
		{children}
	</Component>
);

Stack.propTypes = {
	children: PropTypes.node.isRequired,
	gap: PropTypes.oneOf(['xxs', 'xs', 's', 'm', 'l', 'xl']).isRequired,
	className: PropTypes.string,
	as: PropTypes.string,
};
