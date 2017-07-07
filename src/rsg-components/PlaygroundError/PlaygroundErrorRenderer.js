import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';

const styles = ({ fontFamily, fontSize, color, space }) => ({
	root: {
		margin: [[-space[2], -space[2], -(space[2] + space[0])]],
		padding: space[2],
		lineHeight: 1.2,
		fontSize: fontSize.small,
		fontFamily: fontFamily.monospace,
		color: color.error,
		backgroundColor: color.errorBackground,
		whiteSpace: 'pre',
	},
});

export function PlaygroundErrorRenderer({ classes, message }) {
	return (
		<pre className={classes.root}>
			{message}
		</pre>
	);
}

PlaygroundErrorRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	message: PropTypes.string.isRequired,
};

export default Styled(styles)(PlaygroundErrorRenderer);
