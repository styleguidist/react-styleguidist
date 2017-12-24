import React from 'react';
import PropTypes from 'prop-types';

export const CodeRenderer = (props) => {
	const styles = {
		colorSwatch: {
			backgroundColor: props.color,
			border: props.border || 'none',
			display: 'inline-block',
			fontSize: 'inherit',
			height: '1rem',
			margin: props.margin || 'none',
			verticalAlign: 'sub',
			width: '1rem'
		}
	};

	return (
		<div style={styles.colorSwatch} />
	);
}

CodeRenderer.propTypes = {
	border: PropTypes.string,
	color : PropTypes.string,
	margin: PropTypes.string
};

export default CodeRenderer;
