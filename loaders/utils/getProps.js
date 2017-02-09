'use strict';

const path = require('path');
const reactDocs = require('react-docgen');
const highlightCode = require('./highlightCode');
const removeDoclets = require('./removeDoclets');
const requireIt = require('./requireIt');

const examplesLoader = path.resolve(__dirname, '../examples-loader.js');

/**
 * Replace example doclet with a require statement AST.
 *
 * @param {object} doc
 * @returns {object}
 */
module.exports = function getProps(doc) {
	if (doc.description) {
		// Read doclets from the description and remove them
		// HACK: We have to make sure that doc.doclets is a proper object with correct prototype to
		// work around an issue in react-docgen that breaks the build if a component has JSDoc tags
		// like @see in its description, see https://github.com/reactjs/react-docgen/issues/155
		// and https://github.com/styleguidist/react-styleguidist/issues/298
		doc.doclets = Object.assign({}, reactDocs.utils.docblock.getDoclets(doc.description));
		doc.description = removeDoclets(doc.description);
		doc.description = highlightCode(doc.description);

		if (doc.doclets.example) {
			doc.example = requireIt(`!!${examplesLoader}!${doc.doclets.example}`);
			delete doc.doclets.example;
		}
	}
	else {
		doc.doclets = {};
	}

	return doc;
};
