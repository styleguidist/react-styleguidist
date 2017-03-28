import jss from 'jss';

const styles = {
	// Global styles
	body: {
		isolate: false,
		margin: 0,
		padding: 0,
		border: 0,

		// Tweak CodeMirror styles
		'& .CodeMirror': {
			isolate: false,
			height: 'auto',
			padding: [[5, 12]],
			fontSize: 12,
		},
		'& .CodeMirror-scroll': {
			isolate: false,
			height: 'auto',
			overflowY: 'hidden',
			overflowX: 'auto',
		},
		'& .cm-error': {
			isolate: false,
			background: 'none !important',
		},
	},
};

// Attach styles to body
const { body } = jss.createStyleSheet(styles).attach().classes;
document.body.classList.add(body);
