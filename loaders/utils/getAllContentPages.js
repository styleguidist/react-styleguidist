'use strict';

/**
 * Get all section content pages.
 *
 * @param {Array} sections
 * @returns {Array}
 */
module.exports = function getAllContentPages(sections) {
	return sections.reduce((pages, section) => {
		if (section.content) {
			pages = pages.concat([section.content]);
		}

		if (section.sections) {
			pages = pages.concat(getAllContentPages(section.sections));
		}

		return pages;
	}, []);
};
