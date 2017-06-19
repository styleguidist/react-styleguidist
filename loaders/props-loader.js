'use strict';

const path = require('path');
const isArray = require('lodash/isArray');
const reactDocs = require('react-docgen');
const generate = require('escodegen').generate;
const toAst = require('to-ast');
const getExamples = require('./utils/getExamples');
const getProps = require('./utils/getProps');

/* eslint-disable no-console */

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
		/* istanbul ignore next */
		const errorMessage = err.toString();
		const componentPath = path.relative(process.cwd(), file);
		const message = errorMessage === 'Error: No suitable component definition found.'
			? `Warning: ${componentPath} matches a pattern defined in ”components” or “sections” options in your ` +
					'style guide config but doesn’t export a component.'
			: `Error when parsing ${componentPath}: ${err}\n\n` +
					'It usually means that react-docgen cannot parse your source code, try to file an issue here:\n' +
					'https://github.com/reactjs/react-docgen/issues';
		console.log(`\n${message}\n`);
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
