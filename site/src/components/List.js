import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Stack } from './Stack';
import styles from './List.module.css';

export const List = ({ children, className, ...rest }) => (
	<Stack as="ul" gap="s" className={clsx(styles.list, className)} {...rest}>
		{children}
	</Stack>
);

List.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
};
