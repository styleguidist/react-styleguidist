"use strict";

exports.__esModule = true;
exports.default = getAst;
exports.ACORN_OPTIONS = void 0;

var _acorn = require("acorn");

var _glogg = _interopRequireDefault(require("glogg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const logger = (0, _glogg.default)('rsg');
const ACORN_OPTIONS = {
  ecmaVersion: 2019,
  sourceType: 'module'
};
/**
 * Parse source code with Acorn and return AST, returns undefined in case of errors
 */

exports.ACORN_OPTIONS = ACORN_OPTIONS;

function getAst(code, plugins = []) {
  const parser = _acorn.Parser.extend(...plugins);

  try {
    return parser.parse(code, ACORN_OPTIONS);
  } catch (err) {
    logger.debug(`Acorn cannot parse example code: ${err.message}\n\nCode:\n${code}`);
    return undefined;
  }
}