import jss from './setupjss';

const styles = {
	// Global styles
	body: {
		isolate: false,
		margin: 0,
		padding: 0,
		minWidth: 0,
		maxWidth: '100%',
		border: 0,
	},
};

// Attach styles to body
const { body } = jss.createStyleSheet(styles).attach().classes;
document.body.classList.add(body);
