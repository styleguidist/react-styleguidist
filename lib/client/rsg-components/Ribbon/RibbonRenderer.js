import "core-js/modules/es.string.link";
import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';
export var styles = function styles(_ref) {
  var color = _ref.color,
      space = _ref.space,
      fontSize = _ref.fontSize,
      fontFamily = _ref.fontFamily;
  return {
    root: {
      position: 'fixed',
      top: 0,
      right: 0,
      width: 149,
      height: 149,
      zIndex: 999
    },
    link: {
      fontFamily: fontFamily.base,
      position: 'relative',
      right: -37,
      top: -22,
      display: 'block',
      width: 190,
      padding: [[space[0], space[2]]],
      textAlign: 'center',
      color: color.ribbonText,
      fontSize: fontSize.base,
      background: color.ribbonBackground,
      textDecoration: 'none',
      textShadow: [[0, '-1px', 0, 'rgba(0,0,0,.15)']],
      transformOrigin: [[0, 0]],
      transform: 'rotate(45deg)',
      cursor: 'pointer'
    }
  };
};
export var RibbonRenderer = function RibbonRenderer(_ref2) {
  var classes = _ref2.classes,
      url = _ref2.url,
      text = _ref2.text;
  return /*#__PURE__*/React.createElement("footer", {
    className: classes.root
  }, /*#__PURE__*/React.createElement("a", {
    href: url,
    className: classes.link
  }, text));
};
RibbonRenderer.defaultProps = {
  text: 'Fork me on GitHub'
};
RibbonRenderer.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
  url: PropTypes.string.isRequired,
  text: PropTypes.string
};
export default Styled(styles)(RibbonRenderer);