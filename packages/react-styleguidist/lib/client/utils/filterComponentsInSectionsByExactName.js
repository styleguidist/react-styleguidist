import "core-js/modules/es6.array.from";
import "core-js/modules/es6.regexp.to-string";
import "core-js/modules/es7.symbol.async-iterator";
import "core-js/modules/es6.symbol";
import "core-js/modules/web.dom.iterable";

import filterComponentsByExactName from './filterComponentsByExactName';

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") {return Array.from(iter);} }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }
/**
 * Recursively filters all components in all sections by component name.
 *
 * @param {object} sections
 * @param {string} name
 * @param {boolean} recursive
 * @return {Array}
 */

export default function filterComponentsInSectionsByExactName(sections, name, recursive) {
  const filteredSections = [];
  sections.forEach(function (section) {
    if (section.components) {
      const filteredComponents = filterComponentsByExactName(section.components, name);

      if (filteredComponents.length) {
        filteredSections.push({
          exampleMode: section.exampleMode,
          usageMode: section.usageMode,
          components: filteredComponents
        });
      }
    }

    if (section.sections && recursive) {
      filteredSections.push(..._toConsumableArray(filterComponentsInSectionsByExactName(section.sections, name, recursive)));
    }
  });
  return filteredSections;
}