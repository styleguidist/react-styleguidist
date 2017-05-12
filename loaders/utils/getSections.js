'use strict';

// This two functions should be in the same file because of cyclic imports

const fs = require('fs');
const path = require('path');
const requireIt = require('./requireIt');
const getComponentFiles = require('./getComponentFiles');
const getComponents = require('./getComponents');

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

/**
 * Return an object for a given section with all components and subsections.
 * @param {object} section
 * @param {object} config
 * @returns {object}
 */
function processSection(section, config) {
	// Try to load section content file
	let content;
	if (section.content) {
		const filepath = path.resolve(config.configDir, section.content);
		if (!fs.existsSync(filepath)) {
			throw new Error(`Styleguidist: Section content file not found: ${filepath}`);
		}
		content = requireIt(`!!${examplesLoader}!${filepath}`);
	}

	return {
		name: section.name,
		components: getComponents(
			getComponentFiles(section.components, config.configDir, config.ignore),
			config
		),
		sections: getSections(section.sections || [], config),
		content,
	};
}

module.exports = getSections;
module.exports.processSection = processSection;
