import "core-js/modules/es.array.filter";
import "core-js/modules/es.array.map";
import "core-js/modules/es.function.name";
import "core-js/modules/es.object.assign";
import getFilterRegExp from './getFilterRegExp';
import filterComponentsByName from './filterComponentsByName';

/**
 * Fuzzy filters sections by section or component name.
 *
 * @param {Array} sections
 * @param {string} query
 * @return {Array}
 */
export default function filterSectionsByName(sections, query) {
  var regExp = getFilterRegExp(query);
  return sections.map(function (section) {
    return Object.assign({}, section, {
      sections: section.sections ? filterSectionsByName(section.sections, query) : [],
      components: section.components ? filterComponentsByName(section.components, query) : []
    });
  }).filter(function (section) {
    return section.components.length > 0 || section.sections.length > 0 || regExp.test(section.name || '-');
  });
}