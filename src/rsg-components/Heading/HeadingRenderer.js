import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Styled from 'rsg-components/Styled';

function HeadingRenderer({ classes, depth, id, deprecated, children }) {
	const Tag = `h${depth}`;
	const headingClasses = cx(classes[`heading${depth}`], {
		[classes.isDeprecated]: deprecated,
	});

	return (
		<Tag id={id} className={headingClasses}>
			{children}
		</Tag>
	);
}

export const styles = ({ color, fontSize, fontFamily }) => ({
	heading: {
		color: color.base,
		fontFamily: fontFamily.base,
		fontWeight: 'normal',
	},
	heading1: {
		composes: '$heading',
		fontSize: fontSize.h1,
	},
	heading2: {
		composes: '$heading',
		fontSize: fontSize.h2,
	},
	heading3: {
		composes: '$heading',
		fontSize: fontSize.h3,
	},
	heading4: {
		composes: '$heading',
		fontSize: fontSize.h4,
	},
	heading5: {
		composes: '$heading',
		fontSize: fontSize.h5,
	},
	heading6: {
		composes: '$heading',
		fontSize: fontSize.h6,
	},
	isDeprecated: {
		textDecoration: 'line-through',
		color: color.light,
	},
});

HeadingRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	depth: PropTypes.oneOf([1, 2, 3, 4, 5, 6]).isRequired,
	id: PropTypes.string,
	deprecated: PropTypes.bool,
	children: PropTypes.node,
};

export default Styled(styles)(HeadingRenderer);
