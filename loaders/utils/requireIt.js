'use strict';

/**
 * Wrap a string with require() statement.
 *
 * @param {string} name Module name.
 * @returns {string}
 */
module.exports = function requireIt(name) {
	return 'require(' + JSON.stringify(name) + ')';
};
