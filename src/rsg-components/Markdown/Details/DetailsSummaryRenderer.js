import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';

const styles = ({ space, color, fontSize, fontFamily }) => ({
	summary: {
		marginBottom: space[1],
		fontFamily: fontFamily.base,
		fontSize: fontSize.base,
		color: color.base,
		cursor: 'pointer',
		'&:focus': {
			isolate: false,
			outline: [[1, 'dotted', color.linkHover]],
			outlineOffset: 2,
		},
	},
});

export function DetailsSummaryRenderer({ classes, children }) {
	return <summary className={classes.summary}>{children}</summary>;
}

DetailsSummaryRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	children: PropTypes.node.isRequired,
};

export default Styled(styles)(DetailsSummaryRenderer);
