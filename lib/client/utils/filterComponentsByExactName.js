import "core-js/modules/es.array.filter";
import "core-js/modules/es.function.name";

/**
 * Filters list of components by component name.
 *
 * @param {Array} components
 * @param {string} name
 * @return {Array}
 */
export default function filterComponentsByExactName(components, name) {
  return components.filter(function (component) {
    return component.name === name;
  });
}