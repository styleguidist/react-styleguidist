'use strict';

const reactDocs = require('react-docgen');
const highlightCode = require('./highlightCode');
const removeDoclets = require('./removeDoclets');
const requireIt = require('./requireIt');

/**
 * Replace example doclet with a require statement AST.
 *
 * @param {object} doc
 * @returns {object}
 */
module.exports = function getProps(doc) {
	if (doc.description) {
		// Read doclets from the description and remove them
		doc.doclets = reactDocs.utils.docblock.getDoclets(doc.description);
		doc.description = removeDoclets(doc.description);
		doc.description = highlightCode(doc.description);

		if (doc.doclets.example) {
			doc.example = requireIt('!!../loaders/examples-loader!' + doc.doclets.example);
			delete doc.doclets.example;
		}
	}
	else {
		doc.doclets = {};
	}

	return doc;
};
