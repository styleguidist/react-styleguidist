import React from 'react';
import PropTypes from 'prop-types';

import { styles as paraStyles } from 'rsg-components/Para';
import Styled from 'rsg-components/Styled';

const styles = ({ space, color, fontSize, fontFamily, borderRadius }) => ({
	pre: {
		...paraStyles({ space, color, fontFamily }).para,
		fontSize: fontSize.small,
		whiteSpace: 'pre',
		backgroundColor: color.codeBackground,
		padding: [[space[1], space[2]]],
		border: [[1, color.border, 'solid']],
		borderRadius,
	},
});

export function PreRenderer({ classes, children }) {
	return <pre className={classes.pre}>{children}</pre>;
}
PreRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	children: PropTypes.node.isRequired,
};

export default Styled(styles)(PreRenderer);
