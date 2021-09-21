import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';

var styles = function styles(_ref) {
  var space = _ref.space,
      color = _ref.color,
      fontSize = _ref.fontSize,
      fontFamily = _ref.fontFamily;
  return {
    summary: {
      marginBottom: space[1],
      fontFamily: fontFamily.base,
      fontSize: fontSize.base,
      color: color.base,
      cursor: 'pointer',
      '&:focus': {
        isolate: false,
        outline: [[1, 'dotted', color.linkHover]],
        outlineOffset: 2
      }
    }
  };
};

export var DetailsSummaryRenderer = function DetailsSummaryRenderer(_ref2) {
  var classes = _ref2.classes,
      children = _ref2.children;
  return /*#__PURE__*/React.createElement("summary", {
    className: classes.summary
  }, children);
};
DetailsSummaryRenderer.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
  children: PropTypes.node.isRequired
};
export default Styled(styles)(DetailsSummaryRenderer);