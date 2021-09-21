import "core-js/modules/es.string.small";
import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';
export var styles = function styles(_ref) {
  var fontFamily = _ref.fontFamily,
      fontSize = _ref.fontSize,
      color = _ref.color;
  return {
    type: {
      fontFamily: fontFamily.monospace,
      fontSize: fontSize.small,
      color: color.type
    }
  };
};
export var TypeRenderer = function TypeRenderer(_ref2) {
  var classes = _ref2.classes,
      children = _ref2.children;
  return /*#__PURE__*/React.createElement("span", {
    className: classes.type
  }, children);
};
TypeRenderer.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
  children: PropTypes.node.isRequired
};
export default Styled(styles)(TypeRenderer);