import React from 'react';
import PropTypes from 'prop-types';

import Styled from 'rsg-components/Styled';
import { styles as paraStyles } from 'rsg-components/Para';

const styles = ({ space, color, fontSize, fontFamily }) => ({
	blockquote: {
		...paraStyles({ space, color, fontFamily }).para,
		fontSize: fontSize.base,
		margin: [[space[2], space[4]]],
		padding: 0,
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
