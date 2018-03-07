import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';

export const styles = ({ color, fontSize, fontFamily }) => ({
	root: {
		position: 'fixed',
		top: 0,
		right: 0,
		width: '149px',
		height: '149px',
		zIndex: 999,
	},
	link: {
		fontFamily: fontFamily.base,
		position: 'relative',
		right: -37,
		top: -22,
		display: 'block',
		width: 190,
		padding: '5px 15px',
		textAlign: 'center',
		color: color.ribbonText,
		fontSize: fontSize.base,
		background: color.ribbonBackground,
		textDecoration: 'none',
		textShadow: '0 -1px 0 rgba(0,0,0,.15)',
		transformOrigin: '0 0',
		transform: 'rotate(45deg)',
		cursor: 'pointer',
	},
});

export function RibbonRenderer({ classes, url, text }) {
	return (
		<div className={classes.root}>
			<a href={url} className={classes.link}>
				{text || 'Fork me on GitHub'}
			</a>
		</div>
	);
}

RibbonRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	url: PropTypes.string.isRequired,
	text: PropTypes.string,
	color: PropTypes.string,
	background: PropTypes.string,
};

export default Styled(styles)(RibbonRenderer);
