'use strict';

const path = require('path');
const getNameFallback = require('./getNameFallback');
const getExamples = require('./getExamples');
const requireIt = require('./requireIt');

/**
 * Return an object with all required for style guide information for a given component.
 *
 * @param {string} filepath
 * @param {object} config
 * @returns {object}
 */
module.exports = function processComponent(filepath, config) {
	const nameFallback = getNameFallback(filepath);
	const examplesFile = config.getExampleFilename(filepath);
	const componentPath = path.relative(config.configDir, filepath);
	return {
		nameFallback,
		filepath: componentPath,
		pathLine: config.getComponentPathLine(componentPath),
		module: requireIt(filepath),
		props: requireIt('!!../loaders/props-loader!' + filepath),
		examples: getExamples(examplesFile, nameFallback, config.defaultExample),
	};
};
