import "core-js/modules/es.regexp.exec";
import "core-js/modules/es.string.replace";
import find from 'lodash/find';
import getAst from './getAst'; // Strip semicolon (;) at the end

var unsemicolon = function unsemicolon(s) {
  return s.replace(/;\s*$/, '');
};
/**
 * Take source code and returns:
 * 1. Code before the last top-level expression.
 * 2. Code with the last top-level expression wrapped in a return statement
 *    (kind of an implicit return).
 *
 * Example:
 * var a = 1; React.createElement('i', null, a); // =>
 * 1. var a = 1
 * 2. var a = 1; return (React.createElement('i', null, a));
 */


export default function splitExampleCode(code) {
  var ast = getAst(code);

  if (!ast) {
    return {
      head: '',
      example: code
    };
  }

  var firstExpression = find(ast.body.reverse(), {
    type: 'ExpressionStatement'
  });

  if (!firstExpression) {
    return {
      head: '',
      example: code
    };
  }

  var start = firstExpression.start,
      end = firstExpression.end;
  var head = unsemicolon(code.substring(0, start));
  var firstExpressionCode = unsemicolon(code.substring(start, end));
  var example = head + ";\nreturn (" + firstExpressionCode + ");";
  return {
    head: head,
    example: example
  };
}