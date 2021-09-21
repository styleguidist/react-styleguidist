"use strict";

exports.__esModule = true;
exports.default = getComponents;

var _processComponent = _interopRequireDefault(require("./processComponent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Process each component in a list.
 *
 * @param {Array} components File names of components.
 * @param {object} config
 * @returns {object|null}
 */
function getComponents(components, config) {
  return components.map(filepath => (0, _processComponent.default)(filepath, config));
}