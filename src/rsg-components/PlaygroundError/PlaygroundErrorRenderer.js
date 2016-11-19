import React, { PropTypes } from 'react';
import Styled from 'rsg-components/Styled';

const styles = ({ monospace, white, errorBackground }) => ({
	root: {
		margin: [[-15, -15, -18]],
		fontFamily: monospace,
		color: white,
		backgroundColor: errorBackground,
		padding: 15,
		lineHeight: 1.2,
		fontSize: 13,
	},
});

export const PlaygroundErrorRenderer = ({ classes, message }) => (
	<pre className={classes.root}>{message}</pre>
);

PlaygroundErrorRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	message: PropTypes.string.isRequired,
};

export default Styled(styles)(PlaygroundErrorRenderer);
