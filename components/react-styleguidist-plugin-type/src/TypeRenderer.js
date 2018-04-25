import React from 'react';
import PropTypes from 'prop-types';
import Code from 'react-styleguidist-plugin-code'
import Styled from 'react-styleguidist-plugin-styled'

export const styles = ({ fontSize, color }) => ({
	type: {
		fontSize: fontSize.small,
		color: color.type,
	},
});

export function TypeRenderer({ classes, children }) {
	return (
		<span className={classes.type}>
			<Code>{children}</Code>
		</span>
	);
}

TypeRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	children: PropTypes.node.isRequired,
};

export default Styled(styles)(TypeRenderer);
