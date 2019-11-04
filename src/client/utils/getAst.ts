import { Parser, Node, Options } from 'acorn';

export interface Program extends Node {
	type: 'program',
	body: Node[]
}

export const ACORN_OPTIONS:Options = {
	ecmaVersion: 2019,
	sourceType: 'module',
};

/**
 * Parse source code with Acorn and return AST, returns undefined in case of errors
 */
export default function getAst(code: string): Program | undefined {
	try {
		return (Parser.parse(code, {
			...ACORN_OPTIONS,
		}) as any) as Program;
	} catch (err) {
		return undefined;
	}
}
