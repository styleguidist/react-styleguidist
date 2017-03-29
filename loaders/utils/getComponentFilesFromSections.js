'use strict';

const getComponentFiles = require('./getComponentFiles');

/**
 * Return absolute paths of all components in sections.
 *
 * @param {Array} sections
 * @param {string} rootDir
 * @param {Array} [ignore] Glob patterns to ignore.
 * @returns {Array}
 */
module.exports = function getComponentFilesFromSections(sections, rootDir, ignore) {
	return sections.reduce((components, section) => {
		if (section.components) {
			return components.concat(getComponentFiles(section.components, rootDir, ignore));
		}

		if (section.sections) {
			return components.concat(getComponentFilesFromSections(section.sections, rootDir, ignore));
		}

		return components;
	}, []);
};
