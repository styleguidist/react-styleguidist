import "core-js/modules/es6.object.assign";
import "core-js/modules/web.dom.iterable";
import "core-js/modules/es6.array.iterator";
import "core-js/modules/es6.object.keys";
import "core-js/modules/es6.string.small";

import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';
import cx from 'classnames';

function _extends() { _extends = Object.assign || function (target) { for (let i = 1; i < arguments.length; i++) { const source = arguments[i]; for (const key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) {return {};} const target = _objectWithoutPropertiesLoose(source, excluded); let key; let i; if (Object.getOwnPropertySymbols) { const sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) {continue;} if (!Object.prototype.propertyIsEnumerable.call(source, key)) {continue;} target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) {return {};} const target = {}; const sourceKeys = Object.keys(source); let key; let i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) {continue;} target[key] = source[key]; } return target; }
export var styles = function styles(_ref) {
  const fontFamily = _ref.fontFamily;

      
const fontSize = _ref.fontSize;

      
const color = _ref.color;
  return {
    text: {
      fontFamily: fontFamily.base
    },
    inheritSize: {
      fontSize: 'inherit'
    },
    smallSize: {
      fontSize: fontSize.small
    },
    baseSize: {
      fontSize: fontSize.base
    },
    textSize: {
      fontSize: fontSize.text
    },
    baseColor: {
      color: color.base
    },
    lightColor: {
      color: color.light
    },
    em: {
      fontStyle: 'italic'
    },
    strong: {
      fontWeight: 'bold'
    },
    isUnderlined: {
      borderBottom: [[1, 'dotted', color.lightest]]
    }
  };
};
export function TextRenderer(_ref2) {
  let _cx;

  const classes = _ref2.classes;

      
const semantic = _ref2.semantic;

      
const size = _ref2.size;

      
const color = _ref2.color;

      
const underlined = _ref2.underlined;

      
const children = _ref2.children;

      
const props = _objectWithoutProperties(_ref2, ["classes", "semantic", "size", "color", "underlined", "children"]);

  const Tag = semantic || 'span';
  const classNames = cx(classes.text, classes["".concat(size, "Size")], classes["".concat(color, "Color")], (_cx = {}, _defineProperty(_cx, classes[semantic], semantic), _defineProperty(_cx, classes.isUnderlined, underlined), _cx));
  return React.createElement(Tag, _extends({}, props, {
    className: classNames
  }), children);
}
TextRenderer.propTypes = {
  classes: PropTypes.object.isRequired,
  semantic: PropTypes.oneOf(['em', 'strong']),
  size: PropTypes.oneOf(['inherit', 'small', 'base', 'text']),
  color: PropTypes.oneOf(['base', 'light']),
  underlined: PropTypes.bool,
  children: PropTypes.node.isRequired
};
TextRenderer.defaultProps = {
  size: 'inherit',
  color: 'base',
  underlined: false
};
export default Styled(styles)(TextRenderer);