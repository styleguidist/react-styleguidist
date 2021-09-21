import React from 'react';
import PropTypes from 'prop-types';
import cx from 'clsx';
import Styled from 'rsg-components/Styled';

var styles = function styles(_ref) {
  var space = _ref.space,
      color = _ref.color,
      fontSize = _ref.fontSize,
      fontFamily = _ref.fontFamily;
  return {
    blockquote: {
      margin: [[space[2], space[4]]],
      padding: 0,
      color: color.base,
      fontFamily: fontFamily.base,
      fontSize: fontSize.base,
      lineHeight: 1.5
    }
  };
};

export var BlockquoteRenderer = function BlockquoteRenderer(_ref2) {
  var classes = _ref2.classes,
      className = _ref2.className,
      children = _ref2.children;
  var blockquoteClasses = cx(classes.blockquote, className);
  return /*#__PURE__*/React.createElement("blockquote", {
    className: blockquoteClasses
  }, children);
};
BlockquoteRenderer.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};
export default Styled(styles)(BlockquoteRenderer);