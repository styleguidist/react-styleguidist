import { walk } from 'estree-walker';
import rewriteImports from './rewriteImports';
import getAst from './getAst';

const hasImports = (code: string): boolean => !!code.match(/import[\S\s]+?['"]([^'"]+)['"];?/m);

/**
 * Replace ECMAScript imports with require() calls
 */
export default function transpileImports(code: string): string {
	// Don't do anything when the code has nothing that looks like an import
	if (!hasImports(code)) {
		return code;
	}

	// Ignore errors, they should be caught by Buble
	const ast = getAst(code);
	if (!ast) {
		return code;
	}

	let offset = 0;
	// estree walkers type is incompatible with acorns output
	// it is working here out of luck and typescript is demonstrating it 
	// we have to go through the any part to keep the nodes with their `node.start`
	// and `node.stop`
	// eslint-disable-next-line @typescript-eslint/no-explicit-any 
	walk(ast as any, {
		// import foo from 'foo'
		// import 'foo'
		// eslint-disable-next-line @typescript-eslint/no-explicit-any 
		enter: (node: any) => {
			if (node.type === 'ImportDeclaration' && node.source) {
				const start = node.start + offset;
				const end = node.end + offset;

				const statement = code.substring(start, end);
				const transpiledStatement = rewriteImports(statement);

				code = code.substring(0, start) + transpiledStatement + code.substring(end);

				offset += transpiledStatement.length - statement.length;
			}
		},
	});

	return code;
}
