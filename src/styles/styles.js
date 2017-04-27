import jss from 'jss';

const styles = {
	// Global styles
	body: {
		isolate: false,
		margin: 0,
		padding: 0,
		border: 0,
	},
};

// Attach styles to body
const { body } = jss.createStyleSheet(styles).attach().classes;
document.body.classList.add(body);
