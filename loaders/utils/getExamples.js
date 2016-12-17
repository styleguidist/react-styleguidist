'use strict';

const fs = require('fs');
const requireIt = require('./requireIt');

/**
 * Get require statement for examples file if it exists, or for default examples if it was defined.
 *
 * @param {string} examplesFile
 * @param {string} nameFallback
 * @param {string} defaultExample
 * @returns {string}
 */
module.exports = function getExamples(examplesFile, nameFallback, defaultExample) {
	if (fs.existsSync(examplesFile)) {
		return requireIt('!!../loaders/examples-loader!' + examplesFile);
	}

	if (defaultExample) {
		return requireIt('!!../loaders/examples-loader?componentName=' + nameFallback + '!' + defaultExample);
	}

	return null;
};
