import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Styled from 'rsg-components/Styled';

export function SectionHeadingRenderer({
	classes,
	children,
	toolbar,
	id,
	href,
	depth,
	deprecated,
}) {
	const headingLevel = Math.min(6, depth);
	const Tag = `h${headingLevel}`;
	const headingClasses = cx(classes.heading, classes[`heading${headingLevel}`], {
		[classes.isDeprecated]: deprecated,
	});
	return (
		<Tag id={id} className={classes.root}>
			<a href={href} className={headingClasses}>
				{children}
			</a>
			<div className={classes.toolbar}>{toolbar}</div>
		</Tag>
	);
}

export const styles = ({ color, space, fontSize, fontFamily }) => ({
	root: {
		display: 'flex',
		marginBottom: space[1],
		alignItems: 'center',
	},
	heading: {
		color: color.base,
		fontFamily: fontFamily.base,
		fontWeight: 'normal',
		'&:hover, &:active': {
			isolate: false,
			textDecoration: 'underline',
		},
	},
	heading1: {
		fontSize: fontSize.h1,
	},
	heading2: {
		fontSize: fontSize.h2,
	},
	heading3: {
		fontSize: fontSize.h3,
	},
	heading4: {
		fontSize: fontSize.h4,
	},
	heading5: {
		fontSize: fontSize.h5,
	},
	heading6: {
		fontSize: fontSize.h6,
	},
	isDeprecated: {
		textDecoration: 'line-through',
		color: color.light,
	},
	toolbar: {
		marginLeft: 'auto',
	},
});

SectionHeadingRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	children: PropTypes.node,
	toolbar: PropTypes.node,
	id: PropTypes.string.isRequired,
	href: PropTypes.string.isRequired,
	depth: PropTypes.number.isRequired,
	deprecated: PropTypes.bool,
};

export default Styled(styles)(SectionHeadingRenderer);
