const path = require('path');
const fs = require('fs');
const reactDocs = require('react-docgen');
const highlightCodeInMarkdown = require('./highlightCodeInMarkdown');
const removeDoclets = require('./removeDoclets');
const requireIt = require('./requireIt');
const getNameFromFilePath = require('./getNameFromFilePath');
const doctrine = require('doctrine');
const _ = require('lodash');
const logger = require('glogg')('rsg');

const examplesLoader = path.resolve(__dirname, '../examples-loader.js');

const JS_DOC_METHOD_PARAM_TAG_SYNONYMS = ['param', 'arg', 'argument'];
const JS_DOC_METHOD_RETURN_TAG_SYNONYMS = ['return', 'returns'];

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

const doesExternalExampleFileExist = (componentPath, exampleFile) => {
	const exampleFilepath = path.resolve(path.dirname(componentPath), exampleFile);
	const doesFileExist = fs.existsSync(exampleFilepath);

	if (!doesFileExist) {
		logger.warn(`An example file ${exampleFile} defined in ${componentPath} component not found.`);
	}
	return doesFileExist;
};

const getMethodParamsFromTags = tags => {
	return JS_DOC_METHOD_PARAM_TAG_SYNONYMS.map(
		paramTagSynonym => tags[paramTagSynonym] || []
	).reduce((params, paramTags) => [...params, ...paramTags], []);
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
		let tags = getDoctrineTags(doctrine.parse(method.docblock, { sloppy: true, unwrap: true }));

		// Merge with react-docgen information about arguments and return value with inforamtion from jsdoc
		const params =
			method.params &&
			method.params.map(param =>
				Object.assign(
					param,
					getMethodParamsFromTags(tags).find(tagParam => tagParam.name === param.name)
				)
			);
		const returns = method.returns || (tags.returns && tags.returns[0]);
		// Remove @param and @return and it synonyms from tags
		tags = Object.keys(tags)
			.filter(
				key =>
					[...JS_DOC_METHOD_PARAM_TAG_SYNONYMS, ...JS_DOC_METHOD_RETURN_TAG_SYNONYMS].indexOf(
						key
					) === -1
			)
			.reduce((prev, key) => ({ ...prev, [key]: tags[key] }), {});

		return Object.assign(method, returns && { returns }, params && { params }, { tags });
	});

	if (doc.description) {
		// Read doclets from the description and remove them
		doc.doclets = getDocletsObject(doc.description);

		const documentation = doctrine.parse(doc.description);
		doc.tags = getDoctrineTags(documentation);

		doc.description = highlightCodeInMarkdown(removeDoclets(doc.description));

		let exampleFileExists = false;
		let exampleFile = doc.doclets.example;
		// doc.doclets.example might be a boolean or undefined
		if (typeof doc.doclets.example === 'string') {
			exampleFile = doc.doclets.example.trim();
			exampleFileExists = doesExternalExampleFileExist(filepath, exampleFile);
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

	if (!doc.displayName && filepath) {
		// Guess the exported component's display name based on the file path
		doc.displayName = getNameFromFilePath(filepath);
	}

	if (doc.doclets && doc.doclets.visibleName) {
		doc.visibleName = doc.doclets.visibleName;

		// custom tag is added both to doclets and tags
		// removing from both locations
		delete doc.doclets.visibleName;
		if (doc.tags) {
			delete doc.tags.visibleName;
		}
	}

	return doc;
};
