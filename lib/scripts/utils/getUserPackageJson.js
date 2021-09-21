"use strict";

exports.__esModule = true;
exports.default = getUserPackageJson;

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Return user’s package.json.
 *
 * @return {object}
 */
function getUserPackageJson() {
  try {
    return require(_path.default.resolve(process.cwd(), 'package.json'));
  } catch (err) {
    return {};
  }
}