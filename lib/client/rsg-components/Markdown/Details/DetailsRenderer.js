import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';

var styles = function styles(_ref) {
  var space = _ref.space,
      color = _ref.color,
      fontSize = _ref.fontSize,
      fontFamily = _ref.fontFamily;
  return {
    details: {
      marginBottom: space[2],
      fontFamily: fontFamily.base,
      fontSize: fontSize.base,
      color: color.base
    }
  };
};

export var DetailsRenderer = function DetailsRenderer(_ref2) {
  var classes = _ref2.classes,
      children = _ref2.children;
  return /*#__PURE__*/React.createElement("details", {
    className: classes.details
  }, children);
};
DetailsRenderer.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
  children: PropTypes.node.isRequired
};
export default Styled(styles)(DetailsRenderer);