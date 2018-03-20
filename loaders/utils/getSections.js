'use strict';

// This two functions should be in the same file because of cyclic imports

const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const requireIt = require('./requireIt');
const getComponentFiles = require('./getComponentFiles');
const getComponents = require('./getComponents');
const slugger = require('./slugger');

const examplesLoader = path.resolve(__dirname, '../examples-loader.js');

/**
 * Return object for one level of sections.
 *
 * @param {Array} sections
 * @param {object} config
 * @returns {Array}
 */
function getSections(sections, config) {
	return sections.map(section => processSection(section, config));
}

const getSectionComponents = (section, config) => {
	let ignore = config.ignore ? _.castArray(config.ignore) : [];
	if (section.ignore) {
		ignore = ignore.concat(_.castArray(section.ignore));
	}

	return getComponents(getComponentFiles(section.components, config.configDir, ignore), config);
};

/**
 * Return an object for a given section with all components and subsections.
 * @param {object} section
 * @param {object} config
 * @returns {object}
 */
function processSection(section, config) {
	const contentRelativePath = section.content;

	// Try to load section content file
	let content;
	if (contentRelativePath) {
		const contentAbsolutePath = path.resolve(config.configDir, contentRelativePath);
		if (!fs.existsSync(contentAbsolutePath)) {
			throw new Error(`Styleguidist: Section content file not found: ${contentAbsolutePath}`);
		}
		content = requireIt(`!!${examplesLoader}!${contentAbsolutePath}`);
	}

	return {
		name: section.name,
		description: section.description,
		slug: slugger.slug(section.name),
		sections: getSections(section.sections || [], config),
		filepath: contentRelativePath,
		components: getSectionComponents(section, config),
		content,
	};
}

module.exports = getSections;
module.exports.processSection = processSection;
