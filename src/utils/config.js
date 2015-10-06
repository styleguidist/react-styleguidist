var fs = require('fs');
var path = require('path');
var findup = require('findup');
var minimist = require('minimist');
var prettyjson = require('prettyjson');
var _ = require('lodash');
var utils = require('./server');

var CONFIG_FILENAME = 'styleguide.config.js';
var DEFAULT_CONFIG = {
	rootDir: null,
	components: null,
	title: 'Style guide',
	styleguideDir: 'styleguide',
	template: path.join(__dirname, '../templates/index.html'),
	serverHost: 'localhost',
	serverPort: 3000,
	verbose: false,
	getExampleFilename: function(componentpath) {
		return path.join(path.dirname(componentpath), 'Readme.md');
	},
	updateWebpackConfig: null
};

function readConfig() {
	var argv = minimist(process.argv.slice(2));
	var configFilepath = findConfig(argv);

	var options = require(configFilepath);

	validateConfig(options);

	var configDir = path.dirname(configFilepath);
	var rootDir = path.resolve(configDir, options.rootDir);

	if (rootDir === configDir) {
		throw Error('Styleguidist: "rootDir" should not point to a folder with the Styleguidist config and node_modules folder');
	}
	if (!utils.isDirectoryExists(rootDir)) {
		throw Error('Styleguidist: "rootDir" directory not found: ' + rootDir);
	}

	options = _.merge({}, DEFAULT_CONFIG, options);
	options = _.merge({}, options, {
		verbose: !!argv.verbose,
		rootDir: rootDir,
		styleguideDir: path.resolve(configDir, options.styleguideDir)
	});

	if (options.verbose) {
		console.log();
		console.log('Using config file:', configFilepath);
		console.log(prettyjson.render(options));
		console.log();
	}

	return options;
}

function findConfig(argv) {
	if (argv.config) {
		// Custom config location

		var configFilepath = path.join(process.cwd(), argv.config);
		if (!fs.existsSync(configFilepath)) {
			throw Error('Styleguidist config not found: ' + configFilepath + '.');
		}

		return configFilepath;
	}
	else {
		// Search config file in all parent directories

		var configDir;
		try {
			configDir = findup.sync(__dirname, CONFIG_FILENAME);
		}
		catch (e) {
			throw Error('Styleguidist config not found: ' + CONFIG_FILENAME + '.');
		}

		return path.join(configDir, CONFIG_FILENAME);
	}
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
