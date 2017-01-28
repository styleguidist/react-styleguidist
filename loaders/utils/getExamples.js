'use strict';

const fs = require('fs');
const path = require('path');
const requireIt = require('./requireIt');

const examplesLoader = path.resolve(__dirname, '../examples-loader.js');

/**
 * Get require statement for examples file if it exists, or for default examples if it was defined.
 *
 * @param {string} examplesFile
 * @param {string} nameFallback
 * @param {string} defaultExample
 * @returns {object|null}
 */
module.exports = function getExamples(examplesFile, nameFallback, defaultExample) {
	if (fs.existsSync(examplesFile)) {
		return requireIt(`!!${examplesLoader}!${examplesFile}`);
	}

	if (defaultExample) {
		return requireIt(`!!${examplesLoader}?componentName=${nameFallback}!${defaultExample}`);
	}

	return null;
};
