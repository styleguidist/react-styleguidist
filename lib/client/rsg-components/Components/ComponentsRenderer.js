import React from 'react';
import PropTypes from 'prop-types';
export default function ComponentsRenderer(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/React.createElement("div", null, children);
}
ComponentsRenderer.propTypes = {
  children: PropTypes.node.isRequired
};