import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';

const styles = ({ space, color, fontSize, fontFamily }) => ({
	details: {
		marginBottom: space[2],
		fontFamily: fontFamily.base,
		fontSize: fontSize.base,
		color: color.base,
	},
});

export function DetailsRenderer({ classes, children }) {
	return <details className={classes.details}>{children}</details>;
}

DetailsRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	children: PropTypes.node.isRequired,
};

export default Styled(styles)(DetailsRenderer);
