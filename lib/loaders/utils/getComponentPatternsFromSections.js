"use strict";

exports.__esModule = true;
exports.default = getComponentPatternsFromSections;

/**
 * Return all glob patterns from all sections.
 *
 * NOTE: a section cannot have components & subsections
 * @param {Array} sections
 * @returns {Array}
 */
function getComponentPatternsFromSections(sections) {
  return sections.reduce((patterns, section) => {
    if (Array.isArray(section.components)) {
      return patterns.concat(section.components);
    }

    if (section.sections) {
      return patterns.concat(getComponentPatternsFromSections(section.sections));
    }

    return patterns;
  }, []);
}