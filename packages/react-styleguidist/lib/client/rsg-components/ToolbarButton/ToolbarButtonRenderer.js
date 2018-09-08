import "core-js/modules/es6.string.small";

import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';
import cx from 'classnames';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
export var styles = function styles(_ref) {
  const space = _ref.space;

      
const color = _ref.color;
  return {
    button: {
      padding: 2,
      // Increase clickable area a bit
      color: color.light,
      background: 'transparent',
      transition: 'color 750ms ease-out',
      cursor: 'pointer',
      '&:hover, &:focus': {
        isolate: false,
        color: color.linkHover,
        transition: 'color 150ms ease-in'
      },
      '&:focus': {
        isolate: false,
        outline: [[1, 'dotted', color.linkHover]]
      },
      '& + &': {
        isolate: false,
        marginLeft: space[1]
      },
      // Style react-icons icon passed as children
      '& svg': {
        width: space[3],
        height: space[3],
        color: 'currentColor',
        cursor: 'inherit'
      }
    },
    isSmall: {
      '& svg': {
        width: 14,
        height: 14
      }
    }
  };
};
export function ToolbarButtonRenderer(_ref2) {
  const classes = _ref2.classes;

      
const className = _ref2.className;

      
const onClick = _ref2.onClick;

      
const href = _ref2.href;

      
const title = _ref2.title;

      
const small = _ref2.small;

      
const children = _ref2.children;
  const classNames = cx(classes.button, className, _defineProperty({}, classes.isSmall, small));

  if (href !== undefined) {
    return React.createElement("a", {
      href,
      title,
      className: classNames,
      "aria-label": title
    }, children);
  }

  return React.createElement("button", {
    type: "button",
    onClick,
    title,
    className: classNames,
    "aria-label": title
  }, children);
}
ToolbarButtonRenderer.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func,
  title: PropTypes.string,
  small: PropTypes.bool,
  children: PropTypes.node
};
export default Styled(styles)(ToolbarButtonRenderer);