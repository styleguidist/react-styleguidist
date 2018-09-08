import "core-js/modules/web.dom.iterable";
import "core-js/modules/es6.array.iterator";
import "core-js/modules/es6.object.keys";
import "core-js/modules/es6.function.name";
import "core-js/modules/es6.regexp.replace";

function _objectSpread(target) { for (let i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; let ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Remove quotes around given string.
 *
 * @param {string} string
 * @returns {string}
 */
export function unquote(string) {
  return string.replace(/^['"]|['"]$/g, '');
}
/**
 * Return prop type object.
 *
 * @param {object} prop
 * @returns {object}
 */

export function getType(prop) {
  if (prop.flowType) {
    if (prop.flowType.name === 'union' && prop.flowType.elements.every(function (elem) {
      return elem.name === 'literal';
    })) {
      return _objectSpread({}, prop.flowType, {
        name: 'enum',
        value: prop.flowType.elements
      });
    }

    return prop.flowType;
  }

  return prop.type;
}
/**
 * Show starting and ending whitespace around given string.
 *
 * @param {string} string
 * @returns {string}
 */

export function showSpaces(string) {
  return string.replace(/^\s|\s$/g, '␣');
}