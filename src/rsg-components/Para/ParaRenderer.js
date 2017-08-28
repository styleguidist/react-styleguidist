import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';

export const styles = ({ space, fontFamily, color }) => ({
	para: {
		marginTop: 0,
		marginBottom: space[2],
		color: color.base,
		fontFamily: fontFamily.base,
		fontSize: 'inherit',
		lineHeight: 1.5,
	},
});

export function ParaRenderer({ classes, children }) {
	return <div className={classes.para}>{children}</div>;
}

ParaRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	children: PropTypes.node.isRequired,
};

export default Styled(styles)(ParaRenderer);
