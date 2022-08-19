import { Parser, Node as AcornNode, Options } from 'acorn';
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
): AcornNode | undefined {
	const parser = Parser.extend(...plugins);

	try {
		return parser.parse(code, ACORN_OPTIONS);
	} catch (err) {
		if (err instanceof Error) {
			logger.debug(`Acorn cannot parse example code: ${err.message}\n\nCode:\n${code}`);
			return undefined;
		}
		return undefined;
	}
}
