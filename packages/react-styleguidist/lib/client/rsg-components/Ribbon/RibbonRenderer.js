import "core-js/modules/es6.string.link";
import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';

export var styles = function styles(_ref) {
  const color = _ref.color;

      
const space = _ref.space;

      
const fontSize = _ref.fontSize;

      
const fontFamily = _ref.fontFamily;
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
export function RibbonRenderer(_ref2) {
  const classes = _ref2.classes;

      
const url = _ref2.url;

      
const text = _ref2.text;
  return React.createElement("div", {
    className: classes.root
  }, React.createElement("a", {
    href: url,
    className: classes.link
  }, text));
}
RibbonRenderer.defaultProps = {
  text: 'Fork me on GitHub'
};
RibbonRenderer.propTypes = {
  classes: PropTypes.object.isRequired,
  url: PropTypes.string.isRequired,
  text: PropTypes.string
};
export default Styled(styles)(RibbonRenderer);