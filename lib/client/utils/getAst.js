import "core-js/modules/es.object.assign";
import { Parser } from 'acorn';
export var ACORN_OPTIONS = {
  ecmaVersion: 2019,
  sourceType: 'module'
};
/**
 * Parse source code with Acorn and return AST, returns undefined in case of errors
 */

export default function getAst(code) {
  try {
    return Parser.parse(code, Object.assign({}, ACORN_OPTIONS));
  } catch (err) {
    return undefined;
  }
}