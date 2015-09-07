var path = require('path');
var findup = require('findup');
var _ = require('lodash');

var CONFIG_FILENAME = 'styleguide.config.js';
var DEFAULT_CONFIG = {
	getExampleFilename: function(componentpath) {
		return path.join(path.dirname(componentpath),  'examples.md');
	}
};

function readConfig() {
	try {
		var rootDir = findup.sync(__dirname, CONFIG_FILENAME);
	}
	catch (e) {
		throw Error('Styleguidist config not found: ' + CONFIG_FILENAME + '.');
	}

	var options = require(path.join(rootDir, CONFIG_FILENAME));

	validateConfig(options);

	options = _.merge({}, DEFAULT_CONFIG, options, {
		rootDir: rootDir
	});

	return options;
}

function validateConfig(options) {
	if (!options.components) {
		throw Error('Styleguidist: "components" options is required.');
	}
	if (options.getExampleFilename && typeof options.getExampleFilename !== 'function') {
		throw Error('Styleguidist: "getExampleFilename" options must be a function.');
	}
}

module.exports = readConfig();
