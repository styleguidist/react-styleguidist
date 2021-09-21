import "core-js/modules/es.array.index-of";
import "core-js/modules/es.object.assign";
import "core-js/modules/es.object.keys";
import "core-js/modules/es.string.small";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'clsx';
import Styled from 'rsg-components/Styled';
export var styles = function styles(_ref) {
  var fontFamily = _ref.fontFamily,
      fontSize = _ref.fontSize,
      color = _ref.color;
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
export var TextRenderer = function TextRenderer(_ref2) {
  var _cx;

  var classes = _ref2.classes,
      semantic = _ref2.semantic,
      size = _ref2.size,
      color = _ref2.color,
      underlined = _ref2.underlined,
      children = _ref2.children,
      props = _objectWithoutPropertiesLoose(_ref2, ["classes", "semantic", "size", "color", "underlined", "children"]);

  var Tag = semantic || 'span';
  var classNames = cx(classes.text, classes[size + "Size"], classes[color + "Color"], (_cx = {}, _cx[classes[Tag]] = !!semantic, _cx[classes.isUnderlined] = underlined, _cx));
  return /*#__PURE__*/React.createElement(Tag, _extends({}, props, {
    className: classNames
  }), children);
};
TextRenderer.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
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