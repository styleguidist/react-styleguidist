// @flow
const path = require('path');
const qs = require('querystringify');
const requireIt = require('./requireIt');

const examplesLoader = path.resolve(__dirname, '../examples-loader.js');

/**
 * Get require statement for examples file if it exists, or for default examples if it was defined.
 */
module.exports = function getExamples(
	file: string,
	displayName: string,
	examplesFile: string,
	defaultExample: string
): {} {
	const examplesFileToLoad = examplesFile || defaultExample;
	if (!examplesFileToLoad) {
		return null;
	}

	const relativePath = `./${path.relative(path.dirname(examplesFileToLoad), file)}`;

	const query = {
		displayName,
		file: relativePath,
		shouldShowDefaultExample: !examplesFile && !!defaultExample,
	};
	return requireIt(`!!${examplesLoader}?${qs.stringify(query)}!${examplesFileToLoad}`);
};
