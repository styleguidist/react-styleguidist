"use strict";

exports.__esModule = true;
exports.default = filterComponentsWithExample;

/**
 * Filter out components without an example file.
 *
 * @param {Array} sections
 * @returns {Array}
 */
function filterComponentsWithExample(sections) {
  return sections.map(section => ({ ...section,
    sections: filterComponentsWithExample(section.sections),
    components: section.components.filter(component => component.hasExamples)
  })).filter(section => section.components.length > 0 || section.sections.length > 0 || section.content);
}