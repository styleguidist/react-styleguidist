import { Parser, Node, Options } from 'acorn';

export interface Program extends Node {
	body: Node[];
}

export const ACORN_OPTIONS: Options = {
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
		// types of acorn are too simplistic and we have to use the body
		// eslint-disable-next-line @typescript-eslint/no-explicit-any 
		}) as any) as Program;
	} catch (err) {
		return undefined;
	}
}
