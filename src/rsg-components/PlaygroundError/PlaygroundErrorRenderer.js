import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';

const styles = ({ fontFamily, fontSize, color }) => ({
	root: {
		margin: 0,
		lineHeight: 1.2,
		fontSize: fontSize.small,
		fontFamily: fontFamily.monospace,
		color: color.error,
		whiteSpace: 'pre',
	},
});

export function PlaygroundErrorRenderer({ classes, message }) {
	return <pre className={classes.root}>{message}</pre>;
}

PlaygroundErrorRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	message: PropTypes.string.isRequired,
};

export default Styled(styles)(PlaygroundErrorRenderer);
