import * as acorn from 'acorn';
import find from 'lodash/find';

// Strip semicolon (;) at the end
const unsemicolon = s => s.replace(/;\s*$/, '');

/**
 * Take source code and returns:
 * 1. Code before the last top-level expression.
 * 2. Code with the last top-level expression wrappen in a return statement
 *    (kind of an implicit return).
 *
 * Example:
 * var a = 1; React.createElement('i', null, a); // =>
 * 1. var a = 1
 * 2. var a = 1; return (React.createElement('i', null, a));
 *
 * @param {string} code
 * @returns {object}
 */
export default function splitExampleCode(code) {
	let ast;
	try {
		ast = acorn.parse(code, { ecmaVersion: 2019 });
	} catch (err) {
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
