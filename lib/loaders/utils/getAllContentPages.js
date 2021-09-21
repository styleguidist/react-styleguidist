"use strict";

exports.__esModule = true;
exports.default = getAllContentPages;

/**
 * Get all section content pages.
 *
 * @param {Array} sections
 * @returns {Array}
 */
function getAllContentPages(sections) {
  return sections.reduce((pages, section) => {
    if (section.content) {
      pages = pages.concat([section.content]);
    }

    if (section.sections) {
      pages = pages.concat(getAllContentPages(section.sections));
    }

    return pages;
  }, []);
}