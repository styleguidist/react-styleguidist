import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './Column.module.css';

export const Row = ({ children, className, as: Component = 'div', ...rest }) => (
	<Component className={clsx('row', className)} {...rest}>
		{children}
	</Component>
);

Row.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	as: PropTypes.string,
};

export const Column = ({ children, size, order, className, as: Component = 'div', ...rest }) => (
	<Component
		className={clsx('col', `col--${size}`, order && styles[`col--order-${order}`], className)}
		{...rest}
	>
		{children}
	</Component>
);

Column.propTypes = {
	children: PropTypes.node.isRequired,
	size: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]).isRequired,
	order: PropTypes.oneOf([2]),
	className: PropTypes.string,
	as: PropTypes.string,
};
