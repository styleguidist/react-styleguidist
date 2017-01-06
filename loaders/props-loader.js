'use strict';

const path = require('path');
const castArray = require('lodash/castArray');
const reactDocs = require('react-docgen');
const generate = require('escodegen').generate;
const toAst = require('to-ast');
const getPropsCode = require('./utils/getProps');

/* eslint-disable no-console */

module.exports = function(source) {
	/* istanbul ignore if */
	if (this.cacheable) {
		this.cacheable();
	}

	const file = this.request.split('!').pop();
	const config = this.options.styleguidist;

	const defaultParser = (filePath, source) => reactDocs.parse(source, config.resolver, config.handlers);
	const propsParser = config.propsParser || defaultParser;

	let parsedProps;
	try {
		parsedProps = propsParser(file, source);
	}
	/* istanbul ignore next */
	catch (exception) {
		parsedProps = [];
		console.log('Error when parsing', path.relative(process.cwd(), file));
		console.log(exception.toString());
		console.log();
	}

	const props = castArray(parsedProps).map(getPropsCode);

	return `
if (module.hot) {
	module.hot.accept([])
}

module.exports = ${generate(toAst(props))}
	`;
};
