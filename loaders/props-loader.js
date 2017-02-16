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

	const defaultParser = (filePath, source) => reactDocs.parse(source, config.resolver, config.handlers(file));
	const propsParser = config.propsParser || defaultParser;

	let props = {};
	try {
		props = propsParser(file, source);
	}
	/* istanbul ignore next */
	catch (exception) {
		console.log('Error when parsing', path.relative(process.cwd(), file));
		console.log(exception.toString());
		console.log();
	}

	// Support only one component
	if (isArray(props)) {
		props = props[0];
	}

	props = getProps(props);

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
