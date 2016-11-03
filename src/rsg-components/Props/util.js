import trim from 'lodash/trim';

/**
 * Remove quotes around given string.
 *
 * @param {string} string
 * @returns {string}
 */
export function unquote(string) {
	return trim(string, '"\'');
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
