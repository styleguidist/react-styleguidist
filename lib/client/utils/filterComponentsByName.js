import "core-js/modules/es.array.filter";
import "core-js/modules/es.function.name";
import getFilterRegExp from './getFilterRegExp';

/**
 * Fuzzy filters components list by component name.
 *
 * @param {array} components
 * @param {string} query
 * @return {array}
 */
export default function filterComponentsByName(components, query) {
  var regExp = getFilterRegExp(query);
  return components.filter(function (_ref) {
    var name = _ref.name;
    return regExp.test(name);
  });
}