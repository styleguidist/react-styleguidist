import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';

const styles = ({ monospace, white, errorBackground, spacing, fonts }) => ({
	root: {
		margin: `-${spacing[2]}`,
		marginBottom: -20, // it needs this to fill all the space
		fontFamily: monospace,
		color: white,
		backgroundColor: errorBackground,
		padding: spacing[2],
		lineHeight: 1.2,
		fontSize: fonts.size12,
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
