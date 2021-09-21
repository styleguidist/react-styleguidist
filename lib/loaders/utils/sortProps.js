"use strict";

exports.__esModule = true;
exports.default = void 0;

var _sortBy = _interopRequireDefault(require("lodash/sortBy"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Sorts an array of properties by their 'required' property first and 'name'
 * property second.
 *
 * @param {array} props
 * @return {array} Sorted properties
 */
function sortProps(props) {
  const requiredPropNames = (0, _sortBy.default)(props.filter(prop => prop.required), 'name');
  const optionalPropNames = (0, _sortBy.default)(props.filter(prop => !prop.required), 'name');
  const sortedProps = requiredPropNames.concat(optionalPropNames);
  return sortedProps;
}

var _default = sortProps;
exports.default = _default;