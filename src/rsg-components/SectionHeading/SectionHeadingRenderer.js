import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';
import HeadingRenderer from 'rsg-components/Heading/HeadingRenderer';

export function SectionHeadingRenderer({
	classes,
	id,
	depth,
	deprecated,
	href,
	toolbar,
	children,
}) {
	return (
		<HeadingRenderer id={id} depth={depth} deprecated={deprecated}>
			<div className={classes.root}>
				<a href={href} className={classes.link}>
					{children}
				</a>
				<div className={classes.toolbar}>{toolbar}</div>
			</div>
		</HeadingRenderer>
	);
}

export const styles = ({ color, space, fontFamily }) => ({
	root: {
		display: 'flex',
		marginBottom: space[1],
		alignItems: 'center',
	},
	link: {
		color: color.base,
		fontFamily: fontFamily.base,
		fontWeight: 'normal',
		'&:hover, &:active': {
			isolate: false,
			textDecoration: 'underline',
		},
	},
	toolbar: {
		marginLeft: 'auto',
	},
});

SectionHeadingRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	id: PropTypes.string.isRequired,
	depth: PropTypes.oneOf([1, 2, 3, 4, 5, 6]).isRequired,
	deprecated: PropTypes.bool,
	href: PropTypes.string.isRequired,
	toolbar: PropTypes.node,
	children: PropTypes.node,
};

export default Styled(styles)(SectionHeadingRenderer);
