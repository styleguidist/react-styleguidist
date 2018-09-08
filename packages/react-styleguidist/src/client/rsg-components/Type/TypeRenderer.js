import React from 'react';
import PropTypes from 'prop-types';
import Code from 'rsg-components/Code';
import Styled from 'rsg-components/Styled';

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
