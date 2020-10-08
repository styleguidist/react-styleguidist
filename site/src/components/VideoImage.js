import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './VideoImage.module.css';

export const VideoImage = ({ className, ...rest }) => (
	<div className={clsx(styles.container, className)}>
		<img {...rest} />
	</div>
);

VideoImage.propTypes = {
	src: PropTypes.string.isRequired,
	alt: PropTypes.string.isRequired,
	className: PropTypes.string,
};
