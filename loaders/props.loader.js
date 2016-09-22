'use strict';

const path = require('path');
const castArray = require('lodash/castArray');
const reactDocs = require('react-docgen');
const removeDoclets = require('./utils/removeDoclets');
const utils = require('./utils/js');
const requireIt = utils.requireIt;
const toCode = utils.toCode;


/* eslint-disable no-console */

const REQUIRE_PLACEHOLDER = '<%{#require#}%>';

/**
 * Extract props from JavaScript source code.
 *
 * @param {string} file File path.
 * @param {string} source Source code.
 * @param {Function} propsParser react-docgen parser.
 * @returns {Array}
 */
function parseProps(file, source, propsParser) {
	try {
		return castArray(propsParser(file, source)).map(propsToCode);
	}
	catch (exception) {
		console.log('Error when parsing', path.relative(process.cwd(), file));
		console.log(exception.toString());
		console.log();
		return [];
	}
}

/**
 * Convert props to JavaScript code as a string, extract doclets.
 *
 * @param {object} doc
 * @returns {string}
 */
function propsToCode(doc) {
	if (doc.description) {
		// Read doclets from the description and remove them
		doc.doclets = reactDocs.utils.docblock.getDoclets(doc.description);
		doc.description = removeDoclets(doc.description);

		if (doc.doclets.example) {
			doc.example = REQUIRE_PLACEHOLDER;
		}
	}
	else {
		doc.doclets = {};
	}

	const code = JSON.stringify(doc);

	if (doc.doclets.example) {
		return code.replace(
			JSON.stringify(REQUIRE_PLACEHOLDER),
			requireIt(JSON.stringify('examples!' + doc.doclets.example))
		);
	}
	return code;
}

module.exports = function(source) {
	if (this.cacheable) {
		this.cacheable();
	}

	const file = this.request.split('!').pop();
	const config = this.options.styleguidist;

	const defaultParser = (filePath, source) => reactDocs.parse(source, config.resolver, config.handlers);
	const propsParser = config.propsParser || defaultParser;

	const jsonProps = parseProps(file, source, propsParser);

	return `
		if (module.hot) {
			module.hot.accept([]);
		}
		module.exports = ${toCode(jsonProps)};
	`;
};
