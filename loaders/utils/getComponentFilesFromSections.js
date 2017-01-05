'use strict';

const getComponentFiles = require('./getComponentFiles');

/**
 * Return absolute paths of all components in sections.
 *
 * @param {Array} sections
 * @param {object} config
 * @returns {Array}
 */
module.exports = function getComponentFilesFromSections(sections, config) {
	return sections.reduce((components, section) => {
		if (section.components) {
			return components.concat(getComponentFiles(section.components, config));
		}

		if (section.sections) {
			return components.concat(getComponentFilesFromSections(section.sections, config));
		}

		return components;
	}, []);
};
