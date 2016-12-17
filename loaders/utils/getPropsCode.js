'use strict';

const reactDocs = require('react-docgen');
const removeDoclets = require('./removeDoclets');
const requireIt = require('./requireIt');

const REQUIRE_PLACEHOLDER = '<%{#require#}%>';

/**
 * Convert props to JavaScript code as a string, extract doclets.
 *
 * @param {object} doc
 * @returns {string}
 */
module.exports = function getPropsCode(doc) {
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

	const code = JSON.stringify(doc, null, '  ');

	if (doc.doclets.example) {
		return code.replace(
			JSON.stringify(REQUIRE_PLACEHOLDER),
			requireIt('!!../loaders/examples-loader!' + doc.doclets.example)
		);
	}
	return code;
};
