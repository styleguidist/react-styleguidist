/**
 * Return absolute paths of components that should be rendered in the style guide.
 *
 * @param {string|Function|Array} components Function, Array or glob pattern.
 * @param {string} rootDir
 * @param {Array} [ignore] Glob patterns to ignore.
 * @returns {Array}
 */
export default function getComponentFiles(components?: string | string[] | (() => string[]) | undefined, rootDir?: string, ignore?: string[]): string[];
