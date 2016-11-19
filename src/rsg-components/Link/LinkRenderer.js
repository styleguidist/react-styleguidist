import React, { PropTypes } from 'react';
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

export const LinkRenderer = ({ classes, children, ...props }) => (
	<a {...props} className={classes.link}>
		{children}
	</a>
);

LinkRenderer.propTypes = {
	children: PropTypes.node,
	classes: PropTypes.object.isRequired,
};

export default Styled(styles)(LinkRenderer);
