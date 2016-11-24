'use strict';

const UNQUOTE_MARKER = '<%/#eval#/%>';
const UNQUOTE_MARKER_REGEXP = new RegExp(`"${UNQUOTE_MARKER}(.*?)${UNQUOTE_MARKER}"`, 'g');

/**
 * Convert a plain JavaScript object to text representation: like JSON but some values can be unquoted:
 * {"a": "foo", "b", bar}
 *
 * @param {object} object JavaScript object.
 * @param {Function} filter Function(key, value) that returns true if a value should be unquoted
 * @returns {string}
 */
module.exports = function serialize(object, filter) {
	// Stringify
	const json = JSON.stringify(object, (key, value) => {
		if (filter(key, value)) {
			return `${UNQUOTE_MARKER}${value}${UNQUOTE_MARKER}`;
		}
		return value;
	}, '  ');

	// Unquote values
	return json.replace(UNQUOTE_MARKER_REGEXP, '$1');
};
