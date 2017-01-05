'use strict';

// This two functions should be in the same file because of cyclic imports

const path = require('path');
const requireIt = require('./requireIt');
const getComponentFiles = require('./getComponentFiles');
const getComponents = require('./getComponents');

/**
 * Return object for one level of sections.
 *
 * @param {Array} sections
 * @param {object} config
 * @returns {object|null}
 */
function getSections(sections, config) {
	if (!sections) {
		return null;
	}

	return sections.map(section => processSection(section, config));
}

/**
 * Return an object for a given section with all components and subsections.
 * @param {object} section
 * @param {object} config
 * @returns {object}
 */
function processSection(section, config) {
	return {
		name: section.name,
		content: section.content
			? requireIt('!!../loaders/examples-loader!' + path.resolve(config.configDir, section.content))
			: null,
		components: getComponents(getComponentFiles(section.components, config), config),
		sections: getSections(section.sections, config),
	};
}

module.exports = getSections;
module.exports.processSection = processSection;
