'use strict';

const b = require('ast-types').builders;

class RequireStatement {
	constructor(filepath) {
		this.filepath = filepath;
	}
	toAST() {
		return b.callExpression(b.identifier('require'), [b.literal(this.filepath)]);
	}
}

/**
 * Return a require() statement AST.
 *
 * @param {string} filepath Module name.
 * @returns {object}
 */
module.exports = function requireIt(filepath) {
	return new RequireStatement(filepath);
};
