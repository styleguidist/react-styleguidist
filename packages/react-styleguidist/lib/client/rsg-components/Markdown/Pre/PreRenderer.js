import "core-js/modules/web.dom.iterable";
import "core-js/modules/es6.array.iterator";
import "core-js/modules/es6.object.keys";
import "core-js/modules/es6.string.small";

import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';
import prismTheme from '../../../styles/prismTheme';

function _objectSpread(target) { for (let i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; let ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const styles = function styles(_ref) {
  const space = _ref.space;

      
const color = _ref.color;

      
const fontSize = _ref.fontSize;

      
const fontFamily = _ref.fontFamily;

      
const borderRadius = _ref.borderRadius;
  return {
    pre: _objectSpread({
      fontFamily: fontFamily.base,
      fontSize: fontSize.small,
      lineHeight: 1.5,
      color: color.base,
      whiteSpace: 'pre-wrap',
      wordWrap: 'normal',
      tabSize: 2,
      hyphens: 'none',
      backgroundColor: color.codeBackground,
      padding: [[space[1], space[2]]],
      border: [[1, color.codeBackground, 'solid']],
      borderRadius,
      marginTop: 0,
      marginBottom: space[2]
    }, prismTheme({
      color
    }))
  };
};

export function PreRenderer(_ref2) {
  const classes = _ref2.classes;

      
const children = _ref2.children;
  return React.createElement("pre", {
    className: classes.pre
  }, children);
}
PreRenderer.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired
};
export default Styled(styles)(PreRenderer);