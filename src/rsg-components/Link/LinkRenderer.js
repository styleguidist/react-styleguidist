import React, { PropTypes } from 'react';
import Styled from 'rsg-components/Styled';

const styles = ({ link, linkHover }) => ({
	link: {
		'&, &:link, &:visited': {
			fontFamily: 'inherit',
			fontWeight: 'inherit',
			color: link,
			textDecoration: 'none',
		},
		'&:hover, &:active': {
			color: linkHover,
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
