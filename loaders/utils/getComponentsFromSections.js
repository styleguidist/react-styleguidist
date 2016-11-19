'use strict';

const getComponents = require('./getComponents');

/**
 * Return absolute paths of all components in sections.
 *
 * @param {Array} sections
 * @param {object} config
 * @returns {Array}
 */
module.exports = function getComponentsFromSections(sections, config) {
	return sections.reduce((components, section) => {
		if (section.components) {
			components.push(...getComponents(section.components, config));
		}

		if (section.sections) {
			components.push(...getComponentsFromSections(section.sections, config));
		}

		return components;
	}, []);
};
