'use strict';

/**
 * Filter out components without an example file.
 *
 * @param {Array} sections
 * @returns {Array}
 */
module.exports = function filterComponentsWithExample(sections) {
	return sections
		.map(section =>
			Object.assign({}, section, {
				sections: filterComponentsWithExample(section.sections),
				components: section.components.filter(component => component.hasExamples),
			})
		)
		.filter(
			section => section.components.length > 0 || section.sections.length > 0 || section.content
		);
};
