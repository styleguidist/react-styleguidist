'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unquote = unquote;
exports.getType = getType;
exports.showSpaces = showSpaces;
/**
 * Remove quotes around given string.
 *
 * @param {string} string
 * @returns {string}
 */
function unquote(string) {
  return string.replace(/^['"]|['"]$/g, '');
}

/**
 * Return prop type object.
 *
 * @param {object} prop
 * @returns {object}
 */
function getType(prop) {
  return prop.flowType || prop.type;
}

/**
 * Show starting and ending whitespace around given string.
 *
 * @param {string} string
 * @returns {string}
 */
function showSpaces(string) {
  return string.replace(/^\s|\s$/g, '␣');
}