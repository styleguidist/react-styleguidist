import React from 'react';
import PropTypes from 'prop-types';

import Styled from 'rsg-components/Styled';

const styles = ({ space, color, fontSize, fontFamily }) => ({
	details: {
		fontFamily: fontFamily.base,
		fontSize: fontSize.base,
		color: color.base,
		marginBottom: space[2],
	},
});

export function DetailRenderer({ classes, children }) {
	return <details className={classes.details}>{children}</details>;
}
DetailRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	children: PropTypes.node.isRequired,
};

export default Styled(styles)(DetailRenderer);
