'use strict';

const b = require('ast-types').builders;

/**
 * Return a require() statement AST.
 *
 * @param {string} filepath Module name.
 * @returns {object}
 */
module.exports = function requireIt(filepath) {
	const obj = { require: filepath };
	Object.defineProperty(obj, 'toAST', {
		enumerable: false,
		value() {
			return b.callExpression(b.identifier('require'), [b.literal(filepath)]);
		},
	});
	return obj;
};
