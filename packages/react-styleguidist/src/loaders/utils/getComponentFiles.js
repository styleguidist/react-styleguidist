const path = require('path');
const glob = require('glob');
const isFunction = require('lodash/isFunction');
const isString = require('lodash/isString');

const getFilesMatchingGlobs = (components, rootDir, ignore) =>
	components
		.map(listItem => {
			// Check if the string looks like a glob pattern by using hasMagic
			if (glob.hasMagic(listItem)) {
				return glob.sync(path.resolve(rootDir, listItem), { ignore });
			}
			// Wrap path in an array so reduce always gets an array of arrays
			return [listItem];
		})
		.reduce((accumulator, current) => accumulator.concat(current), []);

/**
 * Return absolute paths of components that should be rendered in the style guide.
 *
 * @param {string|Function|Array} components Function, Array or glob pattern.
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
		componentFiles = getFilesMatchingGlobs(components(), rootDir, ignore);
	} else if (Array.isArray(components)) {
		componentFiles = getFilesMatchingGlobs(components, rootDir, ignore);
	} else if (isString(components)) {
		componentFiles = glob.sync(path.resolve(rootDir, components), { ignore });
	} else {
		throw new Error(
			`Styleguidist: components should be string, function or array, received ${typeof components}.`
		);
	}

	// Make paths absolute
	componentFiles = componentFiles.map(file => path.resolve(rootDir, file));

	return componentFiles;
};
