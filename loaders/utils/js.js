'use strict';

const map = require('lodash/map');

const UNQUOTE_MARKER = '<%/#eval#/%>';
const UNQUOTE_MARKER_REGEXP = new RegExp(`"${UNQUOTE_MARKER}(.*?)${UNQUOTE_MARKER}"`, 'g');

/**
 * Convert plain JavaScript objects and arrays to text representation: WITHOUT any escaping.
 *
 * @param {Array|object} values Array or object.
 * @returns {string}
 */
function toCode(values) {
	if (Array.isArray(values)) {
		return '[' +
			values.join(',\n') +
			']'
		;
	}
	return '{' +
		map(values, (value, key) => `'${key}': ${value}`).join(',\n') +
		'}'
	;
}

/**
 * Convert a plain JavaScript object to text representation: like JSON but some values can be unquoted:
 * {"a": "foo", "b", bar}
 *
 * @param {object} object JavaScript object.
 * @param {Function} filter Function(key, value) that returns true if a value should be unquoted
 * @returns {string}
 */
function serialize(object, filter) {
	// Stringify
	const json = JSON.stringify(object, (key, value) => {
		if (filter(key, value)) {
			return `${UNQUOTE_MARKER}${value}${UNQUOTE_MARKER}`;
		}
		return value;
	}, '  ');

	// Unquote values
	return json.replace(UNQUOTE_MARKER_REGEXP, '$1');
}

/**
 * Wrap a string with require() statement.
 *
 * @param {string} name Module name.
 * @returns {string}
 */
function requireIt(name) {
	return 'require(' + JSON.stringify(name) + ')';
}

module.exports = {
	toCode,
	serialize,
	requireIt,
};
