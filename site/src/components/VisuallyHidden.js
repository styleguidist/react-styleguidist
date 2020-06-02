import React from 'react';
import PropTypes from 'prop-types';
import styles from './VisuallyHidden.module.css';

export const VisuallyHidden = ({
	children,
	as: Component = 'span',
	...rest
}) => (
	<Component className={styles.visuallyHidden} {...rest}>
		{children}
	</Component>
);

VisuallyHidden.propTypes = {
	children: PropTypes.node.isRequired,
	as: PropTypes.string,
};
