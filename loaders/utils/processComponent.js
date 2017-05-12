'use strict';

const fs = require('fs');
const path = require('path');
const requireIt = require('./requireIt');

const propsLoader = path.resolve(__dirname, '../props-loader.js');

/**
 * References the filepath of the metadata file.
 *
 * @param {string} filepath
 * @returns {object}
 */
function getComponentMetadataPath(filepath) {
	const extname = path.extname(filepath);
	return filepath.substring(0, filepath.length - extname.length) + '.json';
}

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
	const componentMetadataPath = getComponentMetadataPath(filepath);
	return {
		filepath: componentPath,
		pathLine: config.getComponentPathLine(componentPath),
		module: requireIt(filepath),
		props: requireIt(`!!${propsLoader}!${filepath}`),
		hasExamples: examplesFile && fs.existsSync(examplesFile),
		metadata: fs.existsSync(componentMetadataPath)
			? requireIt(`!!json-loader!${componentMetadataPath}`)
			: {},
	};
};
