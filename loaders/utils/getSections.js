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
 * @param {number} parentDepth
 * @returns {Array}
 */
function getSections(sections, config, parentDepth) {
	return sections.map(section => processSection(section, config, parentDepth));
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
 * @param {number} parentDepth
 * @returns {object}
 */
function processSection(section, config, parentDepth) {
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

	let sectionDepth;

	if (parentDepth === undefined) {
		sectionDepth = section.sectionDepth !== undefined ? section.sectionDepth : 0;
	} else {
		sectionDepth = parentDepth === 0 ? 0 : parentDepth - 1;
	}

	return {
		name: section.name,
		exampleMode: section.exampleMode || config.exampleMode,
		usageMode: section.usageMode || config.usageMode,
		sectionDepth,
		description: section.description,
		slug: slugger.slug(section.name),
		sections: getSections(section.sections || [], config, sectionDepth),
		filepath: contentRelativePath,
		href: section.href,
		components: getSectionComponents(section, config),
		content,
		external: section.external,
	};
}

module.exports = getSections;
module.exports.processSection = processSection;
