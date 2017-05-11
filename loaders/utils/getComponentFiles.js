'use strict';

const path = require('path');
const glob = require('glob');
const isFunction = require('lodash/isFunction');
const isString = require('lodash/isString');

/**
 * Return absolute paths of components that should be rendered in the style guide.
 *
 * @param {string|Function} components Function or glob pattern.
 * @param {string} rootDir
 * @param {Array} [ignore] Glob patterns to ignore.
 * @returns {Array}
 */
module.exports = function getComponentFiles(components, rootDir, ignore) {
	if (!components) {
		return [];
	}

	let componentFiles;
	if (isFunction(components)) {
		componentFiles = components();
	} else if (isString(components)) {
		componentFiles = glob.sync(path.resolve(rootDir, components), { ignore });
	} else {
		throw new Error(
			`Styleguidist: components should be string or function, received ${typeof components}.`
		);
	}

	// Make paths absolute
	componentFiles = componentFiles.map(file => path.resolve(rootDir, file));

	return componentFiles;
};
