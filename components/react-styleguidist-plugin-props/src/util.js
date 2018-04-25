/**
 * Remove quotes around given string.
 *
 * @param {string} string
 * @returns {string}
 */
export function unquote(string) {
	return string.replace(/^['"]|['"]$/g, '');
}

/**
 * Return prop type object.
 *
 * @param {object} prop
 * @returns {object}
 */
export function getType(prop) {
	return prop.flowType || prop.type;
}

/**
 * Show starting and ending whitespace around given string.
 *
 * @param {string} string
 * @returns {string}
 */
export function showSpaces(string) {
	return string.replace(/^\s|\s$/g, '␣');
}
