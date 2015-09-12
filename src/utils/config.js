var path = require('path');
var findup = require('findup');
var _ = require('lodash');

var CONFIG_FILENAME = 'styleguide.config.js';
var DEFAULT_CONFIG = {
	rootDir: null,
	components: null,
	title: 'Style guide',
	serverHost: 'localhost',
	serverPort: 3000,
	getExampleFilename: function(componentpath) {
		return path.join(path.dirname(componentpath),  'Readme.md');
	},
	updateWebpackConfig: null
};

function readConfig() {
	try {
		var configDir = findup.sync(__dirname, CONFIG_FILENAME);
	}
	catch (e) {
		throw Error('Styleguidist config not found: ' + CONFIG_FILENAME + '.');
	}

	var options = require(path.join(configDir, CONFIG_FILENAME));

	validateConfig(options);

	options = _.merge({}, DEFAULT_CONFIG, options, {
		rootDir: path.join(configDir, options.rootDir)
	});

	return options;
}

function validateConfig(options) {
	if (!options.rootDir) {
		throw Error('Styleguidist: "rootDir" options is required.');
	}
	if (!options.components) {
		throw Error('Styleguidist: "components" options is required.');
	}
	if (options.getExampleFilename && typeof options.getExampleFilename !== 'function') {
		throw Error('Styleguidist: "getExampleFilename" options must be a function.');
	}
	if (options.updateWebpackConfig && typeof options.updateWebpackConfig !== 'function') {
		throw Error('Styleguidist: "updateWebpackConfig" options must be a function.');
	}
}

module.exports = readConfig();
