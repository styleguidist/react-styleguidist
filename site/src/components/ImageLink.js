import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './ImageLink.module.css';

export const ImageLink = ({ children, className, ...rest }) => (
	<a
		className={classnames(styles.link, className)}
		target="_blank"
		rel="noopener noreferrer"
		{...rest}
	>
		{children}
	</a>
);

ImageLink.propTypes = {
	href: PropTypes.string.isRequired,
	className: PropTypes.string,
	children: PropTypes.node.isRequired,
};
