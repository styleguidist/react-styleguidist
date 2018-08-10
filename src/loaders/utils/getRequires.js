// @flow
const acorn = require('acorn-jsx');
const detect = require('detect-import-require');
const glogg = require('glogg');

const logger = glogg('rsg');

const ACORN_OPTIONS = {
	ecmaVersion: 2019,
	sourceType: 'module',
	plugins: {
		jsx: true,
	},
};

type Options = {
	verbose?: boolean,
};

/*
 * Returns a list of all strings used in import statements or require() calls
 */
module.exports = function getRequires(code: string, { verbose = false }: Options = {}): string[] {
	let ast;
	try {
		ast = acorn.parse(code, ACORN_OPTIONS);
	} catch (err) {
		if (verbose) {
			logger.debug(`Cannot parse example code: ${err.message}`);
		}
		return [];
	}
	return detect(ast);
};
