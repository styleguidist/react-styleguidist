"use strict";

exports.__esModule = true;
exports.default = requireIt;

var _astTypes = require("ast-types");

/**
 * Return a require() statement AST.
 *
 * @param {string} filepath Module name.
 * @returns {object}
 */
function requireIt(filepath) {
  const obj = {
    require: filepath
  };
  Object.defineProperty(obj, 'toAST', {
    enumerable: false,

    value() {
      return _astTypes.builders.callExpression(_astTypes.builders.identifier('require'), [_astTypes.builders.literal(filepath)]);
    }

  });
  return obj;
}