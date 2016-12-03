import React, { PropTypes } from 'react';
import Styled from 'rsg-components/Styled';

const styles = ({ font, light, codeBackground }) => ({
	root: {
		padding: [[7, 16, 10, 7]],
		fontFamily: font,
		fontSize: 12,
		color: light,
		backgroundColor: codeBackground,
	},
});

export function EditorLoaderRenderer({ classes }) {
	return (
		<div className={classes.root}>
			Loading…
		</div>
	);
}

EditorLoaderRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default Styled(styles)(EditorLoaderRenderer);
