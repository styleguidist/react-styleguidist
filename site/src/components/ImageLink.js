import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './ImageLink.module.css';

export const ImageLink = ({ children, className, ...rest }) => (
	<a className={clsx(styles.link, className)} target="_blank" rel="noopener noreferrer" {...rest}>
		{children}
	</a>
);

ImageLink.propTypes = {
	href: PropTypes.string.isRequired,
	className: PropTypes.string,
	children: PropTypes.node.isRequired,
};
