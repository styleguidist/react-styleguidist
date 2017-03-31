const system = require('system');

// To make a screenshot: https://github.com/ariya/phantomjs/blob/master/examples/rasterize.js
// phantomjs rasterize.js http://localhost:6060/ output.png

/* eslint-disable no-console, no-multi-assign */
/* globals phantom:false */

if (system.args.length !== 2) {
	console.log('Usage: phantom.js <URL>');
	phantom.exit(1);
}

const page = require('webpage').create();
phantom.onError = page.onError = page.onResourceError = page.onResourceTimeout = function(err) {
	console.log(err);
	phantom.exit(1);
};

page.onConsoleMessage = function(msg) {
	console.log(msg);
};

page.viewportSize = { width: 1024, height: 768 };

page.open(system.args[1], function(status) {
	if (status !== 'success') {
		console.log('Cannot load the page');
		phantom.exit(1);
	}
	phantom.exit(0);
});
