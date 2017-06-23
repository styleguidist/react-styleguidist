import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';

const styles = ({ fontFamily, fontSize, color }) => ({
	pathline: {
		fontFamily: fontFamily.monospace,
		fontSize: fontSize.small,
		color: color.light,
	},
});

export function PathlineRenderer({ classes, children }) {
	return <div className={classes.pathline}>{children}</div>;
}

PathlineRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	children: PropTypes.node,
};

export default Styled(styles)(PathlineRenderer);
