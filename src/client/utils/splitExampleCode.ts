import find from 'lodash/find';
import getAst from './getAst';

// Strip semicolon (;) at the end
const unsemicolon = (s: string): string => s.replace(/;\s*$/, '');

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
export default function splitExampleCode(code: string): { head: string; example: string } {
	const ast = getAst(code);
	if (!ast) {
		return { head: '', example: code };
	}

	const firstExpression = find(ast.body.reverse(), { type: 'ExpressionStatement' });
	if (!firstExpression) {
		return { head: '', example: code };
	}

	const { start, end } = firstExpression;
	const head = unsemicolon(code.substring(0, start));
	const firstExpressionCode = unsemicolon(code.substring(start, end));
	const example = `${head};\nreturn (${firstExpressionCode});`;

	return {
		head,
		example,
	};
}
