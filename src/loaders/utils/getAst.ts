import { Parser, Options } from 'acorn';
import { Program } from 'estree';
import Logger from 'glogg';

const logger = Logger('rsg');

export const ACORN_OPTIONS: Options = {
	ecmaVersion: 2019,
	sourceType: 'module',
};

/**
 * Parse source code with Acorn and return AST, returns undefined in case of errors
 */
export default function getAst(
	code: string,
	plugins: ((BaseParser: typeof Parser) => typeof Parser)[] = []
): Program | undefined {
	const parser = Parser.extend(...plugins);

	try {
		return (parser.parse(code, ACORN_OPTIONS) as unknown) as Program;
	} catch (err) {
		logger.debug(`Acorn cannot parse code: ${err.message}\n\nCode:\n${code}`);
		return undefined;
	}
}
