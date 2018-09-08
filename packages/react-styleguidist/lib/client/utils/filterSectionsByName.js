import "core-js/modules/web.dom.iterable";
import "core-js/modules/es6.array.iterator";
import "core-js/modules/es6.object.keys";
import "core-js/modules/es6.function.name";

import getFilterRegExp from './getFilterRegExp';
import filterComponentsByName from './filterComponentsByName';

function _objectSpread(target) { for (let i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; let ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
/**
 * Fuzzy filters sections by section or component name.
 *
 * @param {Array} sections
 * @param {string} query
 * @return {Array}
 */

export default function filterSectionsByName(sections, query) {
  const regExp = getFilterRegExp(query);
  return sections.map(function (section) {
    return _objectSpread({}, section, {
      sections: section.sections ? filterSectionsByName(section.sections, query) : [],
      components: section.components ? filterComponentsByName(section.components, query) : []
    });
  }).filter(function (section) {
    return section.components.length > 0 || section.sections.length > 0 || regExp.test(section.name);
  });
}