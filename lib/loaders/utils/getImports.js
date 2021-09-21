"use strict";

exports.__esModule = true;
exports.default = getImports;

var _acornJsx = _interopRequireDefault(require("acorn-jsx"));

var _estreeWalker = require("estree-walker");

var _getAst = _interopRequireDefault(require("./getAst"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns a list of all strings used in import statements or require() calls
 */
function getImports(code) {
  // Parse example source code, but ignore errors:
  // 1. Adjacent JSX elements must be wrapped in an enclosing tag (<X/><Y/>) -
  //    imports/requires are not allowed in this case, and we'll wrap the code
  //    in React.Fragment on the frontend
  // 2. All other errors - we'll deal with them on the frontend
  const ast = (0, _getAst.default)(code, [(0, _acornJsx.default)()]);

  if (!ast) {
    return [];
  }

  const imports = [];
  (0, _estreeWalker.walk)(ast, {
    enter: node => {
      // import foo from 'foo'
      // import 'foo'
      if (node.type === 'ImportDeclaration') {
        if (node.source) {
          imports.push(node.source.value);
        }
      } // require('foo')
      else if (node.type === 'CallExpression') {
          if (node.callee && node.callee.name === 'require' && node.arguments && node.arguments[0].value) {
            imports.push(node.arguments[0].value);
          }
        }
    }
  });
  return imports;
}