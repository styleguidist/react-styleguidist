'use strict';

/**
 * Return module from a given map (like {react: require('react')}) or throw.
 * We alllow to require modules only from Markdown examples (won’t work dinamically becasue we need to know all required
 * modules in advance to be able to bundle them with the code).
 *
 * @param {object} requireMap
 * @param {string} filepath
 * @return {object}
 */
module.exports = function requireInRuntime(requireMap, filepath) {
	if (!(filepath in requireMap)) {
		throw new Error(
			'require() statements can be added only by editing a Markdown example file: require("' + filepath + '")'
		);
	}
	return requireMap[filepath];
};
