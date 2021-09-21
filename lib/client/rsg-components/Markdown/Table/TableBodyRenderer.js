import React from 'react';
import PropTypes from 'prop-types';
export var TableBodyRenderer = function TableBodyRenderer(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/React.createElement("tbody", null, children);
};
TableBodyRenderer.propTypes = {
  children: PropTypes.node.isRequired
};
export default TableBodyRenderer;