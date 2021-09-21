import React from 'react';
import PropTypes from 'prop-types';
export var TableRowRenderer = function TableRowRenderer(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/React.createElement("tr", null, children);
};
TableRowRenderer.propTypes = {
  children: PropTypes.node.isRequired
};
export default TableRowRenderer;