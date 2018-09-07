import * as acorn from 'acorn';
import walkes from 'walkes';
import rewriteImports from 'rewrite-imports';
import type { AcornNode } from 'acorn';
import { ACORN_OPTIONS } from '../../consts';

const hasImports = (code: string): boolean => !!code.match(/import[\S\s]+?['"]([^'"]+)['"];?/m);

// Ignore errors, they should be caught by Buble
const getAst = (code: string): AcornNode => {
	try {
		return acorn.parse(code, ACORN_OPTIONS);
	} catch (err) {
		return undefined;
	}
};

/**
 * Replace ECMAScript imports with require() calls
 */
export default function transpileImports(code: string): string {
	// Don't do anything when the code has nothing that looks like an import
	if (!hasImports(code)) {
		return code;
	}

	const ast = getAst(code);
	if (!ast) {
		return code;
	}

	let offset = 0;
	walkes(ast, {
		// import foo from 'foo'
		// import 'foo'
		ImportDeclaration(node) {
			if (node.source) {
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
