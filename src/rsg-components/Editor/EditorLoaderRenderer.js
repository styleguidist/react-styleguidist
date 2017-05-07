import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';

const styles = ({ font, monospace, light, codeBackground, spacing, fonts }) => ({
	root: {
		padding: [[spacing.space8, spacing.space16, spacing.space8, spacing.space8]],
		fontFamily: font,
		fontSize: fonts.size12,
		color: light,
		backgroundColor: codeBackground,
	},
	// Tweak CodeMirror styles. Duplicate selectors are for increased specificity
	'@global': {
		'.CodeMirror.CodeMirror': {
			fontFamily: monospace,
			height: 'auto',
			padding: [[spacing.space4, spacing.space16]],
			fontSize: fonts.size12,
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
