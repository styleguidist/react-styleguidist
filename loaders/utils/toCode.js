'use strict';

const map = require('lodash/map');

/**
 * Convert plain JavaScript objects and arrays to text representation: WITHOUT any escaping.
 *
 * @param {Array|object} values Array or object.
 * @returns {string}
 */
module.exports = function toCode(values) {
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
};
