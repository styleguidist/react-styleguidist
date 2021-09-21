import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';

var styles = function styles(_ref) {
  var color = _ref.color,
      fontFamily = _ref.fontFamily,
      fontSize = _ref.fontSize;
  return {
    version: {
      color: color.light,
      margin: [[5, 0, 0, 0]],
      fontFamily: fontFamily.base,
      fontSize: fontSize.base,
      fontWeight: 'normal'
    }
  };
};

export var VersionRenderer = function VersionRenderer(_ref2) {
  var classes = _ref2.classes,
      children = _ref2.children;
  return /*#__PURE__*/React.createElement("p", {
    "aria-label": "version",
    className: classes.version
  }, children);
};
VersionRenderer.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
  children: PropTypes.node
};
export default Styled(styles)(VersionRenderer);