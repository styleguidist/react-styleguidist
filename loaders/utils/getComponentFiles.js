const path = require('path');
const glob = require('glob');
const isFunction = require('lodash/isFunction');
const isString = require('lodash/isString');

const getComponentGlobs = components => {
	if (isFunction(components)) {
		return components();
	} else if (Array.isArray(components)) {
		return components;
	} else if (isString(components)) {
		return [components];
	}
	throw new Error(
		`Styleguidist: components should be string, function or array, received ${typeof components}.`
	);
};

const getFilesMatchingGlobs = (components, rootDir, ignore) =>
	components
		.map(listItem => {
			// Check if the string looks like a glob pattern by using hasMagic
			if (glob.hasMagic(listItem)) {
				return glob.sync(listItem, {
					cwd: rootDir,
					ignore,
					// in order to avoid detecting each component twice on windows
					// when matching 2 cases of the same word, like {Src,src}
					// we remove case-sensitivity on windows
					nocase: process.platform === 'win32',
				});
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

	// Normalize components option into an Array
	const componentGlobs = getComponentGlobs(components);

	// Resolve list of components from globs
	const componentFiles = getFilesMatchingGlobs(componentGlobs, rootDir, ignore);

	// Make paths absolute
	const componentFilesAbsolute = componentFiles.map(file => path.resolve(rootDir, file));

	return componentFilesAbsolute;
};
