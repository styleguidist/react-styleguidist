const path = require('path');
const glob = require('fast-glob');
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
		.map(listItem =>
			glob.sync(listItem, {
				cwd: rootDir,
				ignore,
			})
		)
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
