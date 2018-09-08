import "core-js/modules/es6.function.name";
import "core-js/modules/es6.string.small";

import React from 'react';
import PropTypes from 'prop-types';
import Code from 'rsg-components/Code';
import Styled from 'rsg-components/Styled';
import cx from 'classnames';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
export var styles = function styles(_ref) {
  const fontSize = _ref.fontSize;

      
const color = _ref.color;
  return {
    name: {
      fontSize: fontSize.small,
      color: color.name
    },
    isDeprecated: {
      color: color.light,
      textDecoration: 'line-through'
    }
  };
};
export function NameRenderer(_ref2) {
  const classes = _ref2.classes;

      
const children = _ref2.children;

      
const deprecated = _ref2.deprecated;
  const classNames = cx(classes.name, _defineProperty({}, classes.isDeprecated, deprecated));
  return React.createElement("span", {
    className: classNames
  }, React.createElement(Code, null, children));
}
NameRenderer.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  deprecated: PropTypes.bool
};
export default Styled(styles)(NameRenderer);