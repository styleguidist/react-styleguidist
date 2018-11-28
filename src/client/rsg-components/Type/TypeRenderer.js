import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';

export const styles = ({ fontFamily, fontSize, color }) => ({
	type: {
		fontFamily: fontFamily.monospace,
		fontSize: fontSize.small,
		color: color.type,
	},
});

export function TypeRenderer({ classes, children }) {
	return <span className={classes.type}>{children}</span>;
}

TypeRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	children: PropTypes.node.isRequired,
};

export default Styled(styles)(TypeRenderer);
