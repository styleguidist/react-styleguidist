'use strict';

const path = require('path');
const getNameFallback = require('./getNameFallback');
const getExamples = require('./getExamples');
const requireIt = require('./requireIt');
const toCode = require('./toCode');

/**
 * Return JS code as a string for a component with all required for style guide information.
 *
 * @param {string} filepath
 * @param {object} config
 * @returns {string}
 */
module.exports = function processComponent(filepath, config) {
	const nameFallback = getNameFallback(filepath);
	const examplesFile = config.getExampleFilename(filepath);
	const componentPath = path.relative(config.configDir, filepath);
	return toCode({
		filepath: JSON.stringify(componentPath),
		nameFallback: JSON.stringify(nameFallback),
		pathLine: JSON.stringify(config.getComponentPathLine(componentPath)),
		module: requireIt(filepath),
		props: requireIt('!!../loaders/props-loader!' + filepath),
		examples: getExamples(examplesFile, nameFallback, config.defaultExample),
	});
};
