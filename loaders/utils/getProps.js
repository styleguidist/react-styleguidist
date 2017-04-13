'use strict';

const path = require('path');
const reactDocs = require('react-docgen');
const highlightCode = require('./highlightCode');
const removeDoclets = require('./removeDoclets');
const requireIt = require('./requireIt');
const doctrine = require('doctrine');

const examplesLoader = path.resolve(__dirname, '../examples-loader.js');

// HACK: We have to make sure that doclets is a proper object with correct prototype to
// work around an issue in react-docgen that breaks the build if a component has JSDoc tags
// like @see in its description, see https://github.com/reactjs/react-docgen/issues/155
// and https://github.com/styleguidist/react-styleguidist/issues/298
const getDocletsObject = (string) => {
	return Object.assign({}, reactDocs.utils.docblock.getDoclets(string));
};

const getTagsFromDoctrine = (documentation) => {
	return documentation.tags.reduce((allTags, tag) => {
		const title = tag.title;
		if (allTags[title]) {
			delete tag.title;
			allTags[title] = allTags[title].concat([tag]);
		}
		else {
			delete tag.title;
			allTags[title] = [tag];
		}
		return allTags;
	}, {});
};

/**
 * 1. Remove non-public methods.
 * 2. Extract doclets.
 * 3. Highlight code in descriptions.
 * 4. Extract @example doclet (load linked file with examples-loader).
 *
 * @param {object} doc
 * @returns {object}
 */
module.exports = function getProps(doc) {
	// Keep only public methods
	doc.methods = (doc.methods || []).filter(method => {
		const doclets = method.docblock && reactDocs.utils.docblock.getDoclets(method.docblock);
		return doclets && doclets.public;
	});

	// Parse the docblock of the remaining methods with doctrine to retrieve the JsDoc tags
	doc.methods = doc.methods.map((method) => {
		return Object.assign(method, {
			tags: getTagsFromDoctrine(doctrine.parse(method.docblock)),
		});
	});

	if (doc.description) {
		// Read doclets from the description and remove them
		doc.doclets = getDocletsObject(doc.description);

		const documentation = doctrine.parse(doc.description);
		doc.tags = getTagsFromDoctrine(documentation);

		doc.description = highlightCode(removeDoclets(doc.description));

		if (doc.doclets.example) {
			doc.example = requireIt(`!!${examplesLoader}!${doc.doclets.example}`);
			delete doc.doclets.example;
		}
	}
	else {
		doc.doclets = {};
	}

	if (doc.props) {
		// Read doclets of props
		Object.keys(doc.props).forEach(propName => {
			const prop = doc.props[propName];
			const doclets = getDocletsObject(prop.description);
			const documentation = doctrine.parse(prop.description);
			doc.props[propName].description = documentation.description;
			doc.props[propName].tags = getTagsFromDoctrine(documentation);

			// Remove ignored props
			if (doclets && doclets.ignore) {
				delete doc.props[propName];
			}
		});
	}

	return doc;
};
