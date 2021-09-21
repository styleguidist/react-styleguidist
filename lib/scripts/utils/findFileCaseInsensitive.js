"use strict";

exports.__esModule = true;
exports.default = findFileCaseInsensitive;
exports.clearCache = clearCache;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _memoize = _interopRequireDefault(require("lodash/memoize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const readdirSync = (0, _memoize.default)(_fs.default.readdirSync);
/**
 * Find a file in a directory, case-insensitive
 *
 * @param {string} filepath
 * @return {string|undefined} File path with correct case
 */

function findFileCaseInsensitive(filepath) {
  const dir = _path.default.dirname(filepath);

  const fileNameLower = _path.default.basename(filepath).toLowerCase();

  const files = readdirSync(dir);
  const found = files.find(file => file.toLowerCase() === fileNameLower);
  return found && _path.default.join(dir, found);
}
/**
 * Clear cache.
 */


function clearCache() {
  readdirSync.cache.clear();
}