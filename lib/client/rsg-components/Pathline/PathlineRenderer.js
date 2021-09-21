import "core-js/modules/es.object.to-string";
import "core-js/modules/es.regexp.to-string";
import "core-js/modules/es.string.small";
import React from 'react';
import copy from 'clipboard-copy';
import { MdContentCopy } from 'react-icons/md';
import ToolbarButton from 'rsg-components/ToolbarButton';
import Styled from 'rsg-components/Styled';
export var styles = function styles(_ref) {
  var space = _ref.space,
      fontFamily = _ref.fontFamily,
      fontSize = _ref.fontSize,
      color = _ref.color;
  return {
    pathline: {
      fontFamily: fontFamily.monospace,
      fontSize: fontSize.small,
      color: color.light,
      wordBreak: 'break-all'
    },
    copyButton: {
      marginLeft: space[0]
    }
  };
};
export var PathlineRenderer = function PathlineRenderer(_ref2) {
  var classes = _ref2.classes,
      children = _ref2.children;
  return /*#__PURE__*/React.createElement("div", {
    className: classes.pathline
  }, children, /*#__PURE__*/React.createElement(ToolbarButton, {
    small: true,
    className: classes.copyButton,
    onClick: function onClick() {
      return children && copy(children.toString());
    },
    title: "Copy to clipboard"
  }, /*#__PURE__*/React.createElement(MdContentCopy, null)));
};
export default Styled(styles)(PathlineRenderer);