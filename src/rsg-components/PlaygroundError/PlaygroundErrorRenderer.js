import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';

const styles = ({ monospace, white, errorBackground, spacing }) => ({
	root: {
		margin: [[-16, -16, -16]],
		fontFamily: monospace,
		color: white,
		backgroundColor: errorBackground,
		padding: spacing.space16,
		lineHeight: 1.2,
		fontSize: 13,
		whiteSpace: 'pre',
	},
});

export function PlaygroundErrorRenderer({ classes, message }) {
	return (
		<pre className={classes.root}>{message}</pre>
	);
}

PlaygroundErrorRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	message: PropTypes.string.isRequired,
};

export default Styled(styles)(PlaygroundErrorRenderer);
