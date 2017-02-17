'use strict';

/**
 * Get all components that have example files.
 *
 * @param {Array} sections
 * @returns {Array}
 */
module.exports = function getAllComponentsWithExamples(sections) {
	return sections.reduce((components, section) => {
		if (section.components) {
			components = components.concat(section.components.filter(component => component.hasExamples));
		}

		if (section.sections) {
			components = components.concat(getAllComponentsWithExamples(section.sections));
		}

		return components;
	}, []);
};
