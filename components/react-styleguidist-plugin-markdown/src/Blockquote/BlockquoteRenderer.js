import React from 'react';
import PropTypes from 'prop-types';

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

export function BlockquoteRenderer({ classes, children }) {
	return <blockquote className={classes.blockquote}>{children}</blockquote>;
}
BlockquoteRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	children: PropTypes.node.isRequired,
};

export default Styled(styles)(BlockquoteRenderer);
