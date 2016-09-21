const path = require('path');
const styleguidist = require('../scripts');

/* eslint-disable no-console */

styleguidist.build({
	config: path.resolve(__dirname, '../examples/basic/styleguide.config.js'),
}, (err, config) => {
	if (err) {
		console.log(err);
	}
	else {
		console.log('Style guide published to', config.styleguideDir);
	}
});
