'use strict';

const getComponentFiles = require('./getComponentFiles');

/**
 * Return absolute paths of all components in sections.
 *
 * @param {Array} sections
 * @param {string} rootDir
 * @returns {Array}
 */
module.exports = function getComponentFilesFromSections(sections, rootDir) {
	return sections.reduce((components, section) => {
		if (section.components) {
			return components.concat(getComponentFiles(section.components, rootDir));
		}

		if (section.sections) {
			return components.concat(getComponentFilesFromSections(section.sections, rootDir));
		}

		return components;
	}, []);
};
