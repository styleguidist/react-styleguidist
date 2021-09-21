import "core-js/modules/es.object.assign";

/**
 * Return a copy of the given section with the examples array filtered
 * to contain only the specified index
 *
 * @param {object} section
 * @param {number} index
 * @returns {object}
 */
export default function filterSectionExamples(section, index) {
  if (index === void 0) {
    index = -1;
  }

  var content = Array.isArray(section.content) ? [section.content[index]] : [];
  return Object.assign({}, section, {
    content: content
  });
}