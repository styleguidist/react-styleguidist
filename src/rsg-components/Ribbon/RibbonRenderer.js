import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';

export const styles = ({ color, space, fontSize, fontFamily }) => ({
	root: {
		position: 'fixed',
		top: 0,
		right: 0,
		width: 149,
		height: 149,
		zIndex: 999,
	},
	link: {
		fontFamily: fontFamily.base,
		position: 'relative',
		right: -37,
		top: -22,
		display: 'block',
		width: 190,
		padding: [[space[0], space[2]]],
		textAlign: 'center',
		color: color.ribbonText,
		fontSize: fontSize.base,
		background: color.ribbonBackground,
		textDecoration: 'none',
		textShadow: [[0, '-1px', 0, 'rgba(0,0,0,.15)']],
		transformOrigin: [[0, 0]],
		transform: 'rotate(45deg)',
		cursor: 'pointer',
	},
});

export function RibbonRenderer({ classes, url, text }) {
	return (
		<div className={classes.root}>
			<a href={url} className={classes.link}>
				{text}
			</a>
		</div>
	);
}

RibbonRenderer.defaultProps = {
	text: 'Fork me on GitHub',
};

RibbonRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	url: PropTypes.string.isRequired,
	text: PropTypes.string,
};

export default Styled(styles)(RibbonRenderer);
