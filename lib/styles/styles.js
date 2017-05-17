'use strict';

var _jss = require('jss');

var _jss2 = _interopRequireDefault(_jss);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
	// Global styles
	body: {
		isolate: false,
		margin: 0,
		padding: 0,
		border: 0
	}
};

// Attach styles to body

var body = _jss2.default.createStyleSheet(styles).attach().classes.body;

document.body.classList.add(body);