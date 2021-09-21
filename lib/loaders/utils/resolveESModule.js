"use strict";

exports.__esModule = true;
exports.default = void 0;

var _astTypes = require("ast-types");

var _requireIt = _interopRequireDefault(require("./requireIt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Resolve ES5 requires for export default, named export and module.exports
 *
 * @param requireRequest the argument of the `require` function
 * @param name the name of the resulting variable
 * @returns AST
 */
var _default = (requireRequest, name) => {
  // The name could possibly contain invalid characters for a JS variable name
  // such as "." or "-". 
  const safeName = name ? name.replace(/\W/, '') : name;
  return [// const safeName$0 = require(path);
  _astTypes.builders.variableDeclaration('const', [_astTypes.builders.variableDeclarator(_astTypes.builders.identifier(`${safeName}$0`), (0, _requireIt.default)(requireRequest).toAST())]), // const safeName = safeName$0.default || safeName$0[safeName] || safeName$0;
  _astTypes.builders.variableDeclaration('const', [_astTypes.builders.variableDeclarator(_astTypes.builders.identifier(safeName), _astTypes.builders.logicalExpression('||', _astTypes.builders.identifier(`${safeName}$0.default`), _astTypes.builders.logicalExpression('||', _astTypes.builders.identifier(`${safeName}$0['${safeName}']`), _astTypes.builders.identifier(`${safeName}$0`))))])];
};

exports.default = _default;