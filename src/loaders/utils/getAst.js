// @flow
import forEach from 'lodash/forEach';
import * as acorn from 'acorn';
import type { AcornNode } from 'acorn';

export const ACORN_OPTIONS = {
	ecmaVersion: 2019,
	sourceType: 'module',
};

/**
 * Parse source code with Acorn and return AST, returns undefined in case of errors
 */
export default function getAst(code: string, plugins?: {}): ?AcornNode {
	const pluginOptions = {};
	let parser = acorn;
	if (plugins) {
		forEach(plugins, (plugin, name) => {
			parser = plugin(parser);
			pluginOptions[name] = true;
		});
	}

	try {
		return parser.parse(code, {
			...ACORN_OPTIONS,
			plugins: pluginOptions,
		});
	} catch (err) {
		return undefined;
	}
}
