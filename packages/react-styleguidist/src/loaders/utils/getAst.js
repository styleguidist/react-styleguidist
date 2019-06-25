// @flow
import { Parser, type AcornNode } from 'acorn';
import Logger from 'glogg';

const logger = Logger('rsg');

export const ACORN_OPTIONS = {
	ecmaVersion: 2019,
	sourceType: 'module',
};

/**
 * Parse source code with Acorn and return AST, returns undefined in case of errors
 */
export default function getAst(code: string, plugins?: Function[] = []): ?AcornNode {
	const parser = Parser.extend(...plugins);

	try {
		return parser.parse(code, ACORN_OPTIONS);
	} catch (err) {
		logger.debug(`Acorn cannot parse example code: ${err.message}\n\nCode:\n${code}`);
		return undefined;
	}
}
