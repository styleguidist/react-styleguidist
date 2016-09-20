'use strict';

/* eslint-disable no-console */

const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const findup = require('findup');
const semverUtils = require('semver-utils');
const prettyjson = require('prettyjson');
const merge = require('lodash/merge');
const utils = require('./utils/utils');

const CONFIG_FILENAME = 'styleguide.config.js';
const DEFAULT_CONFIG = {
	components: null,
	sections: null,
	skipComponentsWithoutExample: false,
	defaultExample: false,
	showCode: false,
	title: 'Style guide',
	styleguideDir: 'styleguide',
	assetsDir: null,
	template: path.join(__dirname, './templates/index.html'),
	serverHost: 'localhost',
	serverPort: 3000,
	highlightTheme: 'base16-light',
	verbose: false,
	getExampleFilename: componentpath => path.join(path.dirname(componentpath), 'Readme.md'),
	getComponentPathLine: componentpath => componentpath,
	updateWebpackConfig: null,
};
const DEPENDENCIES = [
	{
		package: 'babel-core',
		name: 'Babel',
		from: 6,
		to: 6,
	},
	{
		package: 'webpack',
		name: 'Webpack',
		from: 1,
		to: 2,
	},
];
const BUGS_URL = 'https://github.com/sapegin/react-styleguidist/issues';

/**
 * Find and read config file.
 *
 * @param {object} cliOptions command line arguments.
 */
function initialize(cliOptions) {
	_.assign(module.exports, readConfig(cliOptions));
}

/**
 * Read, parse and validate config file.
 * @param {Object} cliOptions e.g. {verbose: true}
 * @returns {Object}
 */
function readConfig(cliOptions) {
	const configFilepath = findConfig(cliOptions);
	let options = require(configFilepath);

	validateConfig(options);

	const configDir = path.dirname(configFilepath);

	validateDependencies(configDir);

	let assetsDir = options.assetsDir;
	if (assetsDir) {
		assetsDir = path.resolve(configDir, assetsDir);
		if (!utils.isDirectoryExists(assetsDir)) {
			throw Error('Styleguidist: "assetsRoot" directory not found: ' + assetsDir);
		}
	}

	let defaultExample = options.defaultExample;
	if (defaultExample === true) {
		defaultExample = path.join(__dirname, './templates/DefaultExample.md');
	}
	else if (typeof defaultExample === 'string') {
		defaultExample = path.resolve(configDir, defaultExample);
		if (!fs.existsSync(defaultExample)) {
			throw Error('Styleguidist: "defaultExample" file not found: ' + defaultExample);
		}
	}

	options = merge({}, DEFAULT_CONFIG, options);
	options = merge({}, options, {
		verbose: !!cliOptions.verbose,
		styleguideDir: path.resolve(configDir, options.styleguideDir),
		configDir,
		assetsDir,
		defaultExample,
	});

	if (options.verbose) {
		console.log();
		console.log('Using config file:', configFilepath);
		console.log(prettyjson.render(options));
		console.log();
	}

	return options;
}

/**
 * Find config file: use file specified in the command line or try to find up the file tree.
 *
 * @param {Object} cliOptions Command line arguments
 * @return {string} Config file path.
 */
function findConfig(cliOptions) {
	if (cliOptions.config) {
		// Custom config location

		const configFilepath = path.join(process.cwd(), cliOptions.config);
		if (!fs.existsSync(configFilepath)) {
			throw Error('Styleguidist config not found: ' + configFilepath + '.');
		}

		return configFilepath;
	}

	// Search config file in all parent directories

	let configDir;
	try {
		configDir = findup.sync(__dirname, CONFIG_FILENAME);
	}
	catch (exception) {
		throw Error('Styleguidist config not found: ' + CONFIG_FILENAME + '.');
	}

	return path.join(configDir, CONFIG_FILENAME);
}

/**
 * Validate config.
 *
 * @param {Object} options Config options.
 */
function validateConfig(options) {
	if (!options.components && !options.sections) {
		throw Error('Styleguidist: "components" or "sections" option is required.');
	}
	if (options.sections && !Array.isArray(options.sections)) {
		throw Error('Styleguidist: "sections" option must be an array.');
	}
	if (options.getExampleFilename && typeof options.getExampleFilename !== 'function') {
		throw Error('Styleguidist: "getExampleFilename" option must be a function.');
	}
	if (options.getComponentPathLine && typeof options.getComponentPathLine !== 'function') {
		throw Error('Styleguidist: "getComponentPathLine" option must be a function.');
	}
	if (options.updateWebpackConfig && typeof options.updateWebpackConfig !== 'function') {
		throw Error('Styleguidist: "updateWebpackConfig" option must be a function.');
	}
	if (options.defaultExample && (options.defaultExample !== true && typeof options.defaultExample !== 'string')) {
		throw Error('Styleguidist: "defaultExample" option must be either false, true, ' +
			'or a string path to a markdown file.');
	}
}

/**
 * Validate project’s Babel and Webpack versions.
 *
 * @param {string} configDir Config file directory.
 */
function validateDependencies(configDir) {
	const packageJsonPath = path.join(findup.sync(configDir, 'package.json'), 'package.json');
	const packageJson = require(packageJsonPath);
	DEPENDENCIES.forEach(validateDependency.bind(null, packageJson));
}

/**
 * Check versions of a project dependency.
 *
 * @param {Object} packageJson package.json.
 * @param {Object} dependency Dependency details.
 */
function validateDependency(packageJson, dependency) {
	const version = findDependency(dependency.package, packageJson);
	if (!version) {
		return;
	}

	let major;
	try {
		major = semverUtils.parseRange(version)[0].major;
	}
	catch (exception) {
		console.log('Styleguidist: cannot parse ' + dependency.name + ' version which is "' + version + '".');
		console.log('Styleguidist might not work properly. Please report this issue at ' + BUGS_URL);
		console.log();
	}

	if (major < dependency.from) {
		throw Error('Styleguidist: ' + dependency.name + ' ' + dependency.from + ' is required, ' +
			'you are using version ' + major + '.');
	}
	else if (major > dependency.to) {
		console.log('Styleguidist: ' + dependency.name + ' is supported up to version ' + dependency.to + ', ' +
			'you are using version ' + major + '.');
		console.log('Styleguidist might not work properly, report bugs at ' + BUGS_URL);
		console.log();
	}
}

/**
 * Find package in project’s dependencies or devDependencies.
 *
 * @param {string} name Package name.
 * @param {Object} packageJson package.json.
 * @returns {string}
 */
function findDependency(name, packageJson) {
	if (packageJson.dependencies && packageJson.dependencies[name]) {
		return packageJson.dependencies[name];
	}
	if (packageJson.devDependencies && packageJson.devDependencies[name]) {
		return packageJson.devDependencies[name];
	}
	return null;
}

module.exports = {
	initialize,
};
