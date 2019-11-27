import acornJsx from 'acorn-jsx';
import { walk } from 'estree-walker';
import getAst from './getAst';

/**
 * Returns a list of all strings used in import statements or require() calls
 */
export default function getImports(code: string): string[] {
	// Parse example source code, but ignore errors:
	// 1. Adjacent JSX elements must be wrapped in an enclosing tag (<X/><Y/>) -
	//    imports/requires are not allowed in this case, and we'll wrap the code
	//    in React.Fragment on the frontend
	// 2. All other errors - we'll deal with them on the frontend
	const ast = getAst(code, [acornJsx()]);
	if (!ast) {
		return [];
	}

	const imports: string[] = [];
	walk(ast as any, {
		enter: (node: any) => {
			// import foo from 'foo'
			// import 'foo'
			if (node.type === 'ImportDeclaration') {
				if (node.source) {
					imports.push(node.source.value);
				}
			}

			// require('foo')
			else if (node.type === 'CallExpression') {
				if (
					node.callee &&
					node.callee.name === 'require' &&
					node.arguments &&
					node.arguments[0].value
				) {
					imports.push(node.arguments[0].value);
				}
			}
		},
	});
	return imports;
}
