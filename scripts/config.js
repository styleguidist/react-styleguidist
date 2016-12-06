'use strict';

/* eslint-disable no-console */

const fs = require('fs');
const path = require('path');
const findup = require('findup');
const prettyjson = require('prettyjson');
const merge = require('lodash/merge');
const StyleguidistError = require('./utils/error');
const sanitizeConfig = require('./utils/sanitizeConfig');
const schema = require('./schemas/config');

const CONFIG_FILENAME = 'styleguide.config.js';

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

	const configDir = configFilepath ? path.dirname(configFilepath) : process.cwd();

	let sanitizedConfig;
	try {
		sanitizedConfig = sanitizeConfig(config, schema, configDir);
	}
	catch (exception) {
		if (exception instanceof StyleguidistError) {
			throw new StyleguidistError(
				'Something is wrong with your style guide config:\n' +
				exception.message
			);
		}
		else {
			throw exception;
		}
	}

	const mergedConfig = merge({}, sanitizedConfig, {
		verbose: !!options.verbose,
		configDir,
	});

	/* istanbul ignore if */
	if (mergedConfig.verbose) {
		console.log();
		console.log('Using config file:', configFilepath);
		console.log(prettyjson.render(config));
		console.log();
	}

	return mergedConfig;
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
		configDir = findup.sync(process.cwd(), CONFIG_FILENAME);
	}
	catch (exception) {
		throw new StyleguidistError('Styleguidist config not found: ' + CONFIG_FILENAME + '.');
	}

	return path.join(configDir, CONFIG_FILENAME);
}

module.exports = getConfig;
