'use strict';

const path = require('path');
const isArray = require('lodash/isArray');
const reactDocs = require('react-docgen');
const generate = require('escodegen').generate;
const toAst = require('to-ast');
const logger = require('glogg')('rsg');
const getExamples = require('./utils/getExamples');
const getProps = require('./utils/getProps');
const consts = require('../scripts/consts');

module.exports = function(source) {
	/* istanbul ignore if */
	if (this.cacheable) {
		this.cacheable();
	}

	const file = this.request.split('!').pop();
	const config = this._styleguidist;

	const defaultParser = (filePath, source, resolver, handlers) =>
		reactDocs.parse(source, resolver, handlers);
	const propsParser = config.propsParser || defaultParser;

	let props = {};
	try {
		props = propsParser(file, source, config.resolver, config.handlers(file));
	} catch (err) {
		const errorMessage = err.toString();
		const componentPath = path.relative(process.cwd(), file);
		const message =
			errorMessage === 'Error: No suitable component definition found.'
				? `${componentPath} matches a pattern defined in “components” or “sections” options in your ` +
					'style guide config but doesn’t export a component.\n\n' +
					'It usually happens when using third-party libraries, see possible solutions here:\n' +
					`${consts.DOCS_THIRDPARTIES}`
				: `Cannot parse ${componentPath}: ${err}\n\n` +
					'It usually means that react-docgen don’t understand your source code, try to file an issue here:\n' +
					'https://github.com/reactjs/react-docgen/issues';
		logger.warn(message);
	}

	// Support only one component
	if (isArray(props)) {
		props = props[0];
	}

	props = getProps(props, file);

	// Examples from Markdown file
	const examplesFile = config.getExampleFilename(file);
	props.examples = getExamples(examplesFile, props.displayName, config.defaultExample);

	return `
if (module.hot) {
	module.hot.accept([])
}

module.exports = ${generate(toAst(props))}
	`;
};
