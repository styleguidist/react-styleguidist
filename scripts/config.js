'use strict';

/* eslint-disable no-console */

const fs = require('fs');
const path = require('path');
const findup = require('findup');
const semverUtils = require('semver-utils');
const prettyjson = require('prettyjson');
const merge = require('lodash/merge');
const utils = require('./utils/utils');
const consts = require('./consts');
const StyleguidistError = require('./utils/error');

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

/**
 * Read, parse and validate config file or passed config.
 *
 * @param {object} [options] CLI options (e.g. {verbose: true} or {config: 'filename'}) or all config options.
 * @returns {object}
 */
function getConfig(options) {
	options = options || {};

	let configFilepath;
	let config;
	if (options.components || options.sections) {
		// Config options was passed to a function
		config = options;
	}
	else {
		// Read config options from a file
		configFilepath = findConfig(options.config);
		config = require(configFilepath);
	}

	validateConfig(config);

	const configDir = configFilepath ? path.dirname(configFilepath) : process.cwd();

	validateDependencies(configDir);

	let assetsDir = config.assetsDir;
	if (assetsDir) {
		assetsDir = path.resolve(configDir, assetsDir);
		if (!utils.isDirectoryExists(assetsDir)) {
			throw new StyleguidistError('Styleguidist: "assetsRoot" directory not found: ' + assetsDir);
		}
	}

	let defaultExample = config.defaultExample;
	if (defaultExample === true) {
		defaultExample = path.join(__dirname, './templates/DefaultExample.md');
	}
	else if (typeof defaultExample === 'string') {
		defaultExample = path.resolve(configDir, defaultExample);
		if (!fs.existsSync(defaultExample)) {
			throw new StyleguidistError('Styleguidist: "defaultExample" file not found: ' + defaultExample);
		}
	}

	config = merge({}, DEFAULT_CONFIG, config);
	config = merge({}, config, {
		verbose: !!options.verbose,
		styleguideDir: path.resolve(configDir, config.styleguideDir),
		configDir,
		assetsDir,
		defaultExample,
	});

	if (config.verbose) {
		console.log();
		console.log('Using config file:', configFilepath);
		console.log(prettyjson.render(config));
		console.log();
	}

	return config;
}

/**
 * Find config file: use file specified in the command line or try to find up the file tree.
 *
 * @param {Object} [file] File name.
 * @return {string} Config absolute file path.
 */
function findConfig(file) {
	if (file) {
		// Custom config location

		const configFilepath = file[0] === '/' ? file : path.join(process.cwd(), file);
		if (!fs.existsSync(configFilepath)) {
			throw new StyleguidistError('Styleguidist config not found: ' + configFilepath + '.');
		}

		return configFilepath;
	}

	// Search config file in all parent directories

	let configDir;
	try {
		configDir = findup.sync(__dirname, CONFIG_FILENAME);
	}
	catch (exception) {
		throw new StyleguidistError('Styleguidist config not found: ' + CONFIG_FILENAME + '.');
	}

	return path.join(configDir, CONFIG_FILENAME);
}

/**
 * Validate config.
 *
 * @param {Object} config Config options.
 */
function validateConfig(config) {
	if (!config.components && !config.sections) {
		throw new StyleguidistError('Styleguidist: "components" or "sections" option is required.');
	}
	if (config.sections && !Array.isArray(config.sections)) {
		throw new StyleguidistError('Styleguidist: "sections" option must be an array.');
	}
	if (config.getExampleFilename && typeof config.getExampleFilename !== 'function') {
		throw new StyleguidistError('Styleguidist: "getExampleFilename" option must be a function.');
	}
	if (config.getComponentPathLine && typeof config.getComponentPathLine !== 'function') {
		throw new StyleguidistError('Styleguidist: "getComponentPathLine" option must be a function.');
	}
	if (config.updateWebpackConfig && typeof config.updateWebpackConfig !== 'function') {
		throw new StyleguidistError('Styleguidist: "updateWebpackConfig" option must be a function.');
	}
	if (config.defaultExample && (config.defaultExample !== true && typeof config.defaultExample !== 'string')) {
		throw new StyleguidistError('Styleguidist: "defaultExample" option must be either false, true, ' +
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
		console.log('Styleguidist might not work properly. Please report this issue at ' + consts.BUGS_URL);
		console.log();
	}

	if (major < dependency.from) {
		throw new StyleguidistError('Styleguidist: ' + dependency.name + ' ' + dependency.from + ' is required, ' +
			'you are using version ' + major + '.');
	}
	else if (major > dependency.to) {
		console.log('Styleguidist: ' + dependency.name + ' is supported up to version ' + dependency.to + ', ' +
			'you are using version ' + major + '.');
		console.log('Styleguidist might not work properly, report bugs at ' + consts.BUGS_URL);
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

module.exports = getConfig;
