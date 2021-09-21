import "core-js/modules/es.array.for-each";
import "core-js/modules/web.dom-collections.for-each";
import filterComponentsByExactName from './filterComponentsByExactName';

/**
 * Recursively filters all components in all sections by component name.
 *
 * @param {object} sections
 * @param {string} name
 * @param {boolean} recursive
 * @return {Array}
 */
export default function filterComponentsInSectionsByExactName(sections, name, recursive) {
  var filteredSections = [];
  sections.forEach(function (section) {
    if (section.components) {
      var filteredComponents = filterComponentsByExactName(section.components, name);

      if (filteredComponents.length) {
        filteredSections.push({
          slug: section.slug,
          exampleMode: section.exampleMode,
          usageMode: section.usageMode,
          components: filteredComponents
        });
      }
    }

    if (section.sections && recursive) {
      filteredSections.push.apply(filteredSections, filterComponentsInSectionsByExactName(section.sections, name, recursive));
    }
  });
  return filteredSections;
}