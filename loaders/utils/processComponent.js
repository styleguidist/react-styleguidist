'use strict';

const fs = require('fs');
const path = require('path');
const requireIt = require('./requireIt');

const propsLoader = path.resolve(__dirname, '../props-loader.js');

/**
 * Return an object with all required for style guide information for a given component.
 *
 * @param {string} filepath
 * @param {object} config
 * @returns {object}
 */
module.exports = function processComponent(filepath, config) {
	const componentPath = path.relative(config.configDir, filepath);
	const examplesFile = config.getExampleFilename(filepath);
	return {
		filepath: componentPath,
		pathLine: config.getComponentPathLine(componentPath),
		module: requireIt(filepath),
		props: requireIt(`!!${propsLoader}!${filepath}`),
		hasExamples: examplesFile && fs.existsSync(examplesFile),
	};
};
