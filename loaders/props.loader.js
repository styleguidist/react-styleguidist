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
		return castArray(propsParser(file, source)).map(propsToCode.bind(null, file));
	}
	catch (exception) {
		console.log('Error when parsing', path.relative(process.cwd(), file));
		console.log(exception.toString());
		console.log();
		return [];
	}
}

/**
 * Returns the section specified in the given example path, or null if a section wasn't provided
 * e.g ./MyExample.md#SomeSection -> SomeSection
 * 		 ./MyExample.md -> null
 *
 * @param  {string} examplePath
 * @return {string|null}
 */
function getSectionFromExamplePath(examplePath) {
	if (examplePath.includes('#')) {
		return examplePath.substring(examplePath.lastIndexOf('#') + 1);
	}

	return null;
}

/**
 * Ensures that the given example path doesn't have a section on the end
 * e.g ./MyExample.md#SomeSection -> ./MyExample.md
 *
 * @param  {string} examplePath
 * @return {string}
 */
function stripSectionFromExamplePath(examplePath) {
	if (examplePath.includes('#')) {
		return examplePath.substring(0, examplePath.lastIndexOf('#'));
	}

	return examplePath;
}

/**
 * Convert props to JavaScript code as a string, extract doclets.
 *
 * @param {string} file The file which contains the component
 * @param {object} doc
 * @returns {string}
 */
function propsToCode(file, doc) {
	let exampleSection;
	let examplePath;

	if (doc.description) {
		// Read doclets from the description and remove them
		doc.doclets = reactDocs.utils.docblock.getDoclets(doc.description);
		doc.description = removeDoclets(doc.description);

		if (doc.doclets.example) {
			exampleSection = getSectionFromExamplePath(doc.doclets.example);
			examplePath = stripSectionFromExamplePath(doc.doclets.example);

			doc.example = REQUIRE_PLACEHOLDER;
			doc.exampleFileName = path.resolve(path.dirname(file), examplePath);
		}
	}
	else {
		doc.doclets = {};
	}

	if (doc.methods) {
		doc.methods = doc.methods.filter((method) => {
			const doclets = reactDocs.utils.docblock.getDoclets(method.docblock);
			return doclets && doclets.public;
		});
	}

	const code = JSON.stringify(doc);

	if (doc.doclets.example) {
		return code.replace(
			JSON.stringify(REQUIRE_PLACEHOLDER),
			exampleSection != null
			?	requireIt('examples?section=' + exampleSection + '!' + examplePath)
			: requireIt('examples!' + examplePath)
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
