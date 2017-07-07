// To make a screenshot: https://github.com/ariya/phantomjs/blob/master/examples/rasterize.js
// phantomjs rasterize.js http://localhost:6060/ output.png

/* eslint-disable no-console, no-multi-assign */
/* globals phantom:false */

const system = require('system');

if (system.args.length !== 2) {
	console.log('Usage: phantom.js <URL>');
	phantom.exit(1);
}

const page = require('webpage').create();

page.onError = phantom.onError = function(err, trace) {
	console.log('PhantomJS error:', err);
	if (trace && trace.length > 0) {
		trace.forEach(function(t) {
			console.log(
				' -> ' +
					(t.file || t.sourceURL) +
					': ' +
					t.line +
					(t.function ? ' (in function ' + t.function + ')' : '')
			);
		});
	}
	phantom.exit(1);
};
page.onResourceError = page.onResourceTimeout = function(err) {
	if (err.url.startsWith('http://placebeard.it/')) {
		return;
	}
	console.log('PhantomJS cannot load resource:', err.url, '-', err.errorString);
};
page.onConsoleMessage = function(msg) {
	console.log('PhantomJS:', msg);
};

page.viewportSize = { width: 1024, height: 768 };

page.open(system.args[1], function(status) {
	if (status !== 'success') {
		console.log('PhantomJS: Cannot load the page');
		phantom.exit(1);
	}
	phantom.exit(0);
});
