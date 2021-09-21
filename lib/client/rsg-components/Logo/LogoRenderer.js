import React from 'react';
import Styled from 'rsg-components/Styled';

var styles = function styles(_ref) {
  var color = _ref.color,
      fontFamily = _ref.fontFamily,
      fontSize = _ref.fontSize;
  return {
    logo: {
      color: color.base,
      margin: 0,
      fontFamily: fontFamily.base,
      fontSize: fontSize.h4,
      fontWeight: 'normal'
    }
  };
};

export var LogoRenderer = function LogoRenderer(_ref2) {
  var classes = _ref2.classes,
      children = _ref2.children;
  return /*#__PURE__*/React.createElement("h1", {
    className: classes.logo
  }, children);
};
export default Styled(styles)(LogoRenderer);