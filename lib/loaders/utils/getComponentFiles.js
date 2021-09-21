"use strict";

exports.__esModule = true;
exports.default = getComponentFiles;

var _glob = _interopRequireDefault(require("glob"));

var _path = _interopRequireDefault(require("path"));

var _isFunction = _interopRequireDefault(require("lodash/isFunction"));

var _isString = _interopRequireDefault(require("lodash/isString"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getComponentGlobs = components => {
  if ((0, _isFunction.default)(components)) {
    return components();
  } else if (Array.isArray(components)) {
    return components;
  } else if ((0, _isString.default)(components)) {
    return [components];
  }

  throw new Error(`Styleguidist: components should be string, function or array, received ${typeof components}.`);
};

const getFilesMatchingGlobs = (components, rootDir, ignore) => {
  ignore = ignore || [];
  return components.map(listItem => _glob.default.sync(listItem, {
    cwd: rootDir,
    ignore,
    absolute: true
  })).reduce((accumulator, current) => accumulator.concat(current), []);
};
/**
 * Return absolute paths of components that should be rendered in the style guide.
 *
 * @param {string|Function|Array} components Function, Array or glob pattern.
 * @param {string} rootDir
 * @param {Array} [ignore] Glob patterns to ignore.
 * @returns {Array}
 */


function getComponentFiles(components, rootDir, ignore) {
  if (!components) {
    return [];
  } // Normalize components option into an Array


  const componentGlobs = getComponentGlobs(components); // Resolve list of components from globs

  const componentFiles = getFilesMatchingGlobs(componentGlobs, rootDir, ignore); // Get absolute component file paths with correct slash separator format

  const resolvedComponentFiles = componentFiles.map(file => _path.default.resolve(file));
  return resolvedComponentFiles;
}