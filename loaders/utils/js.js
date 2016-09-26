'use strict';

const map = require('lodash/map');

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
	requireIt,
};
