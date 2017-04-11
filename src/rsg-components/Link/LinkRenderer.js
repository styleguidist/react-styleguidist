import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';

export const styles = ({ link, linkHover }) => ({
	link: {
		'&, &:link, &:visited': {
			fontFamily: 'inherit',
			fontWeight: 'inherit',
			fontSize: 'inherit',
			color: link,
			textDecoration: 'none',
		},
		'&:hover, &:active': {
			isolate: false,
			color: linkHover,
			cursor: 'pointer',
		},
	},
});

export function LinkRenderer({ classes, children, ...props }) {
	return (
		<a {...props} className={classes.link}>
			{children}
		</a>
	);
}

LinkRenderer.propTypes = {
	children: PropTypes.node,
	classes: PropTypes.object.isRequired,
};

export default Styled(styles)(LinkRenderer);
