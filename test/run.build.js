/* eslint-disable no-console */

const styleguidist = require('../lib/scripts');

styleguidist(require('../examples/basic/styleguide.config.js')).build((err, config) => {
	if (err) {
		console.log(err);
	} else {
		console.log('Style guide published to', config.styleguideDir);
	}
});
