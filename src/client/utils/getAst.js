// @flow
import { Parser, type AcornNode } from 'acorn';

export const ACORN_OPTIONS = {
	ecmaVersion: 2019,
	sourceType: 'module',
};

/**
 * Parse source code with Acorn and return AST, returns undefined in case of errors
 */
export default function getAst(code: string): ?AcornNode {
	try {
		return Parser.parse(code, {
			...ACORN_OPTIONS,
		});
	} catch (err) {
		return undefined;
	}
}
