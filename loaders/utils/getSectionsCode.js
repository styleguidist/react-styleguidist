'use strict';

// This two functions should be in the same file because of cyclic imports

const path = require('path');
const toCode = require('./toCode');
const requireIt = require('./requireIt');
const getComponents = require('./getComponents');
const getComponentsCode = require('./getComponentsCode');

/**
 * Return JS code as a string for one level of sections.
 *
 * @param {Array} sections
 * @param {object} config
 * @returns {string|null}
 */
function getSectionsCode(sections, config) {
	if (!sections) {
		return null;
	}

	return toCode(sections.map(section => processSection(section, config)));
}

/**
 * Return JS code as a string for a given section with all components and subsections.
 * @param {object} section
 * @param {object} config
 * @returns {string}
 */
function processSection(section, config) {
	return toCode({
		name: JSON.stringify(section.name),
		content: section.content
			? requireIt('!!examples-loader!' + path.resolve(config.configDir, section.content))
			: null,
		components: getComponentsCode(getComponents(section.components, config), config),
		sections: getSectionsCode(section.sections, config),
	});
}

module.exports = getSectionsCode;
module.exports.processSection = processSection;
