import { Parser, Options } from 'acorn';
import { parse as looseParse } from 'acorn-loose';
import { Program } from 'estree';
import Logger from 'glogg';

const logger = Logger('rsg');

export const ACORN_OPTIONS: Options = {
	ecmaVersion: 'latest',
	sourceType: 'module',
};

/**
 * 1. Try to parse source code using Acorn, return AST.
 * 2. If failed: try to parse source using with Acorn Loose, return AST.
 * 3. If failed: return undefined.
 */
export default function getAst(
	code: string,
	plugins: ((BaseParser: typeof Parser) => typeof Parser)[] = []
): Program | undefined {
	const parser = Parser.extend(...plugins);

	try {
		return (parser.parse(code, ACORN_OPTIONS) as unknown) as Program;
	} catch (err) {
		try {
			return (looseParse(code, ACORN_OPTIONS) as unknown) as Program;
		} catch (innerErr) {
			logger.debug(`Acorn cannot parse code: ${innerErr.message}\n\nCode:\n${code}`);
			return undefined;
		}
	}
}
