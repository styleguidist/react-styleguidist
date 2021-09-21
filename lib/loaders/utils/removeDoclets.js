"use strict";

exports.__esModule = true;
exports.default = removeDoclets;
// Doclet regexp from react-docgen
const DOCLET_REGEXP = /^@(\w+)(?:$|\s((?:[^](?!^@\w))*))/gim;
/**
 * Remove all doclets (e.g. `@example Foo.js`) from text.
 * @param {string} text
 * @returns {string}
 */

function removeDoclets(text) {
  return text.replace(DOCLET_REGEXP, '');
}