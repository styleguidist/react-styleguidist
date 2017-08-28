import React from 'react';
import PropTypes from 'prop-types';
import Code from 'rsg-components/Code';
import Styled from 'rsg-components/Styled';

const styles = ({ fontFamily, fontSize, color }) => ({
	type: {
		fontFamily: fontFamily.monospace,
		fontSize: fontSize.small,
		color: color.type,
	},
});

export function TypeRenderer({ classes, children }) {
	return <Code className={classes.type}>{children}</Code>;
}

TypeRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	children: PropTypes.node.isRequired,
};

export default Styled(styles)(TypeRenderer);
