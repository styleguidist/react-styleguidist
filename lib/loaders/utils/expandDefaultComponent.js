"use strict";

exports.__esModule = true;
exports.default = expandDefaultComponent;
const COMPONENT_PLACEHOLDER = '__COMPONENT__';
const COMPONENT_PLACEHOLDER_REGEXP = new RegExp(COMPONENT_PLACEHOLDER, 'g');
/**
 * Wrap a string with require() statement.
 *
 * @param {string} source Source code.
 * @param {string} componentName Name that will be used instead of a placeholder.
 * @returns {string}
 */

function expandDefaultComponent(source, componentName) {
  return source.replace(COMPONENT_PLACEHOLDER_REGEXP, componentName);
}