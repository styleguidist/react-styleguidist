import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Styled from 'rsg-components/Styled';

const styles = ({ space, color, fontSize, fontFamily }) => ({
	blockquote: {
		margin: [[space[2], space[4]]],
		padding: 0,
		color: color.base,
		fontFamily: fontFamily.base,
		fontSize: fontSize.base,
		lineHeight: 1.5,
	},
});

export function BlockquoteRenderer({ classes, className, children }) {
	const blockquoteClasses = cx(classes.blockquote, className);
	return <blockquote className={blockquoteClasses}>{children}</blockquote>;
}
BlockquoteRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	className: PropTypes.string,
	children: PropTypes.node.isRequired,
};

export default Styled(styles)(BlockquoteRenderer);
