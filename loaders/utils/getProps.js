'use strict';

const path = require('path');
const fs = require('fs');
const reactDocs = require('react-docgen');
const highlightCode = require('./highlightCode');
const removeDoclets = require('./removeDoclets');
const requireIt = require('./requireIt');
const doctrine = require('doctrine');
const _ = require('lodash');

const examplesLoader = path.resolve(__dirname, '../examples-loader.js');

// HACK: We have to make sure that doclets is a proper object with correct prototype to
// work around an issue in react-docgen that breaks the build if a component has JSDoc tags
// like @see in its description, see https://github.com/reactjs/react-docgen/issues/155
// and https://github.com/styleguidist/react-styleguidist/issues/298
const getDocletsObject = string => {
	return Object.assign({}, reactDocs.utils.docblock.getDoclets(string));
};

const getDoctrineTags = documentation => {
	return _.groupBy(documentation.tags, 'title');
};

const doesExampleFileExist = (basepath, exampleFile) => {
	const exampleFilepath = path.resolve(path.dirname(basepath), exampleFile);
	const doesFileExist = fs.existsSync(exampleFilepath);

	// Only warn when all conditions are met but file still isn't found
	if (!doesFileExist) {
		// eslint-disable-next-line no-console
		console.warn(`An example file ${exampleFile} defined in ${basepath} component not found.`);
	}
	return doesFileExist;
};

/**
 * 1. Remove non-public methods.
 * 2. Extract doclets.
 * 3. Highlight code in descriptions.
 * 4. Extract @example doclet (load linked file with examples-loader).
 *
 * @param {object} doc
 * @param {string} filepath
 * @returns {object}
 */
module.exports = function getProps(doc, filepath) {
	// Keep only public methods
	doc.methods = (doc.methods || []).filter(method => {
		const doclets = method.docblock && reactDocs.utils.docblock.getDoclets(method.docblock);
		return doclets && doclets.public;
	});

	// Parse the docblock of the remaining methods with doctrine to retrieve the JsDoc tags
	doc.methods = doc.methods.map(method => {
		return Object.assign(method, {
			tags: getDoctrineTags(doctrine.parse(method.docblock)),
		});
	});

	if (doc.description) {
		// Read doclets from the description and remove them
		doc.doclets = getDocletsObject(doc.description);

		const documentation = doctrine.parse(doc.description);
		doc.tags = getDoctrineTags(documentation);

		doc.description = highlightCode(removeDoclets(doc.description));

		let exampleFileExists = false;
		let exampleFile = doc.doclets.example;
		// doc.doclets.example might be a boolean or undefined
		if (typeof doc.doclets.example === 'string') {
			exampleFile = doc.doclets.example.trim();
			exampleFileExists = doesExampleFileExist(filepath, exampleFile);
		}

		if (exampleFileExists) {
			doc.example = requireIt(`!!${examplesLoader}!${exampleFile}`);
			delete doc.doclets.example;
		}
	} else {
		doc.doclets = {};
	}

	if (doc.props) {
		// Read doclets of props
		Object.keys(doc.props).forEach(propName => {
			const prop = doc.props[propName];
			const doclets = getDocletsObject(prop.description);
			// when a prop is listed in defaultProps but not in props the prop.description is undefined
			const documentation = doctrine.parse(prop.description || '');

			// documentation.description is the description without tags
			doc.props[propName].description = documentation.description;
			doc.props[propName].tags = getDoctrineTags(documentation);

			// Remove ignored props
			if (doclets && doclets.ignore) {
				delete doc.props[propName];
			}
		});
	}

	return doc;
};
