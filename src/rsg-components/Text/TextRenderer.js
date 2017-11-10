import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';
import cx from 'classnames';

export const styles = ({ fontFamily, fontSize, color }) => ({
	text: {
		fontFamily: fontFamily.base,
		fontSize: fontSize.small,
		color: color.light,
	},
	isUnderlined: {
		borderBottom: [[1, 'dotted', color.lightest]],
	},
});

export function TextRenderer({ classes, children, underlined, ...other }) {
	const classNames = cx(classes.text, {
		[classes.isUnderlined]: underlined,
	});
	return (
		<span className={classNames} {...other}>
			{children}
		</span>
	);
}

TextRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	children: PropTypes.node.isRequired,
	underlined: PropTypes.bool,
};

export default Styled(styles)(TextRenderer);
