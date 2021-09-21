import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';

var styles = function styles() {
  return {
    // Just default jss-isolate rules
    root: {}
  };
};

export var SectionsRenderer = function SectionsRenderer(_ref) {
  var classes = _ref.classes,
      children = _ref.children;
  return /*#__PURE__*/React.createElement("section", {
    className: classes.root
  }, children);
};
SectionsRenderer.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
  children: PropTypes.node
};
export default Styled(styles)(SectionsRenderer);