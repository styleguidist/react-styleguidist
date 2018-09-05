// @flow
import * as acorn from 'acorn';
import { simple, base } from 'acorn/dist/walk';
import acornJsx from 'acorn-jsx/inject';
import type { AcornNode } from 'acorn';

const ACORN_OPTIONS = {
	ecmaVersion: 2019,
	sourceType: 'module',
	plugins: {
		jsx: true,
	},
};

// Noop walkers for JSX, otherwise Acorn will throw on them
// Real implementation: https://github.com/RReverser/acorn-jsx/pull/87
const jsxBase = {
	...base,
	JSXAttribute() {},
	JSXClosingElement() {},
	JSXClosingFragment() {},
	JSXElement() {},
	JSXEmptyExpression() {},
	JSXExpressionContainer() {},
	JSXFragment() {},
	JSXIdentifier() {},
	JSXMemberExpression() {},
	JSXNamespacedName() {},
	JSXOpeningElement() {},
	JSXOpeningFragment() {},
	JSXSpreadAttribute() {},
	JSXSpreadChild() {},
	JSXText() {},
};

const { parse } = acornJsx(acorn);

// Parse example source code, but ignore errors:
// 1. Adjacent JSX elements must be wrapped in an enclosing tag (<X/><Y/>) -
//    imports/requires are not allowed in this case, and we'll wrap the code
//    in React.Fragment on the frontend
// 2. All other errors - we'll deal with them on the frontend
const getAst = (code: string): ?AcornNode => {
	try {
		return parse(code, ACORN_OPTIONS);
	} catch (err) {
		return undefined;
	}
};

/**
 * Returns a list of all strings used in import statements or require() calls
 */
export default function getRequires(code: string): string[] {
	const ast = getAst(code);
	if (!ast) {
		return [];
	}

	const imports = [];
	simple(
		ast,
		{
			// import foo from 'foo'
			// import 'foo'
			ImportDeclaration(node) {
				if (node.source) {
					imports.push(node.source.value);
				}
			},
			// require('foo')
			CallExpression(node) {
				if (
					node.callee &&
					node.callee.name === 'require' &&
					node.arguments &&
					node.arguments[0].value
				) {
					imports.push(node.arguments[0].value);
				}
			},
		},
		jsxBase
	);
	return imports;
}
