import React from 'react';
import PropTypes from 'prop-types';

import Styled from 'rsg-components/Styled';

const styles = ({ space, color, fontSize, fontFamily }) => ({
	summary: {
		fontFamily: fontFamily.base,
		fontSize: fontSize.base,
		color: color.base,
		marginBottom: space[1],
	},
});

export function DetailSummaryRenderer({ classes, children }) {
	return <summary className={classes.summary}>{children}</summary>;
}
DetailSummaryRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	children: PropTypes.node.isRequired,
};

export default Styled(styles)(DetailSummaryRenderer);
