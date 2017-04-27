import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';

const styles = ({ font, monospace, light, codeBackground }) => ({
	root: {
		padding: [[7, 16, 10, 7]],
		fontFamily: font,
		fontSize: 12,
		color: light,
		backgroundColor: codeBackground,
	},
	// Tweak CodeMirror styles. Duplicate selectors increases specificity
	'@global': {
		'.CodeMirror.CodeMirror': {
			fontFamily: monospace,
			height: 'auto',
			padding: [[5, 12]],
			fontSize: 12,
		},
		'.CodeMirror-scroll.CodeMirror-scroll': {
			height: 'auto',
			overflowY: 'hidden',
			overflowX: 'auto',
		},
		'.cm-error.cm-error': {
			background: 'none',
		},
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
