import "core-js/modules/es.array.every";
import "core-js/modules/es.function.name";
import "core-js/modules/es.object.assign";
import "core-js/modules/es.regexp.exec";
import "core-js/modules/es.string.replace";

/**
 * Remove quotes around given string.
 */
export function unquote(string) {
  return string && string.replace(/^['"]|['"]$/g, '');
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
      return Object.assign({}, prop.flowType, {
        name: 'enum',
        value: prop.flowType.elements
      });
    }

    return prop.flowType;
  }

  if (prop.tsType) {
    return prop.tsType;
  }

  return prop.type;
}
/**
 * Show starting and ending whitespace around given string.
 */

export function showSpaces(string) {
  return string && string.replace(/^\s|\s$/g, '␣');
}