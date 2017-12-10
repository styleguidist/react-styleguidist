import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';
import cx from 'classnames';

export const styles = ({ fontFamily, fontSize, color }) => ({
	text: {
		fontFamily: fontFamily.base,
	},
	inheritSize: {
		fontSize: 'inherit',
	},
	smallSize: {
		fontSize: fontSize.small,
	},
	baseSize: {
		fontSize: fontSize.base,
	},
	textSize: {
		fontSize: fontSize.text,
	},
	baseColor: {
		color: color.base,
	},
	lightColor: {
		color: color.light,
	},
	em: {
		fontStyle: 'italic',
	},
	strong: {
		fontWeight: 'bold',
	},
	isUnderlined: {
		borderBottom: [[1, 'dotted', color.lightest]],
	},
});

export function TextRenderer({ classes, semantic, size, color, underlined, children, ...props }) {
	const Tag = semantic || 'span';
	const classNames = cx(classes.text, classes[`${size}Size`], classes[`${color}Color`], {
		[classes[semantic]]: semantic,
		[classes.isUnderlined]: underlined,
	});

	return (
		<Tag {...props} className={classNames}>
			{children}
		</Tag>
	);
}

TextRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	semantic: PropTypes.oneOf(['em', 'strong']),
	size: PropTypes.oneOf(['inherit', 'small', 'base', 'text']),
	color: PropTypes.oneOf(['base', 'light']),
	underlined: PropTypes.bool,
	children: PropTypes.node.isRequired,
};

TextRenderer.defaultProps = {
	size: 'inherit',
	color: 'base',
	underlined: false,
};

export default Styled(styles)(TextRenderer);
