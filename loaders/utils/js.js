'use strict';

const map = require('lodash/map');
const path = require('path');
const escapeRegExp = require('lodash/escapeRegExp');

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

function requireMaybe(name, alternate) {
	const dir = JSON.stringify(path.dirname(name));
	const file = JSON.stringify(`./${path.basename(name)}`);
	const fileRegexp = `/\\/${escapeRegExp(path.basename(name))}$/`;
	const requireAlternate = alternate ? requireIt(alternate) : JSON.stringify(null);

	return [
		'(function () {',
		`var req = require.context(${dir}, false, ${fileRegexp});`,
		`return req.keys().indexOf(${file}) >= 0 ? req(${file}) : ${requireAlternate}`,
		'})()',
	].join('\n');
}

module.exports = {
	toCode,
	requireIt,
	requireMaybe,
};
