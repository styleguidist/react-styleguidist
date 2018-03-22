import * as acorn from 'acorn';

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
		ast = acorn.parse(code);
	} catch (err) {
		return { head: '', example: code };
	}

	const firstExpression = ast.body.reverse().find(({ type }) => type === 'ExpressionStatement');
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
