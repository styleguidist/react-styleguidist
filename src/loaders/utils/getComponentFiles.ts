import glob from 'glob';
import path from 'path';
import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';

const getComponentGlobs = (components: string | string[] | (() => string[])): string[] => {
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

const getFilesMatchingGlobs = (components: string[], rootDir?: string, ignore?: string[]) => {
	ignore = ignore || [];
	return components
		.map(listItem =>
			glob.sync(listItem, {
				cwd: rootDir,
				ignore,
				absolute: true,
			})
		)
		.reduce((accumulator, current) => accumulator.concat(current), []);
};

/**
 * Return absolute paths of components that should be rendered in the style guide.
 *
 * @param {string|Function|Array} components Function, Array or glob pattern.
 * @param {string} rootDir
 * @param {Array} [ignore] Glob patterns to ignore.
 * @returns {Array}
 */
export default function getComponentFiles(
	components?: string | string[] | (() => string[]) | undefined,
	rootDir?: string,
	ignore?: string[]
): string[] {
	if (!components) {
		return [];
	}

	// Normalize components option into an Array
	const componentGlobs = getComponentGlobs(components);

	// Resolve list of components from globs
	const componentFiles = getFilesMatchingGlobs(componentGlobs, rootDir, ignore);

	// Get absolute component file paths with correct slash separator format
	const resolvedComponentFiles = componentFiles.map(file => path.resolve(file));

	return resolvedComponentFiles;
}
