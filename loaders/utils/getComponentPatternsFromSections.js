'use strict';

/**
 * Return all glob patterns from all sections.
 *
 * @param {Array} sections
 * @returns {Array}
 */
module.exports = function getComponentPatternsFromSections(sections) {
	return sections.reduce((patterns, section) => {
		if (section.components) {
			return patterns.concat(section.components);
		}

		if (section.sections) {
			return patterns.concat(getComponentPatternsFromSections(section.sections));
		}

		return patterns;
	}, []);
};
