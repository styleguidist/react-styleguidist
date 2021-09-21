import "core-js/modules/es.function.name";
import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';
import cx from 'clsx';
export var styles = function styles(_ref) {
  var space = _ref.space,
      color = _ref.color,
      fontFamily = _ref.fontFamily,
      fontSize = _ref.fontSize,
      buttonTextTransform = _ref.buttonTextTransform;
  return {
    button: {
      padding: [[space[1], 0]],
      fontFamily: fontFamily.base,
      fontSize: fontSize.base,
      color: color.light,
      background: 'transparent',
      textTransform: buttonTextTransform,
      transition: 'color 750ms ease-out',
      border: 'none',
      cursor: 'pointer',
      '&:hover, &:focus': {
        isolate: false,
        outline: 0,
        color: color.linkHover,
        transition: 'color 150ms ease-in'
      },
      '&:focus:not($isActive)': {
        isolate: false,
        outline: [[1, 'dotted', color.linkHover]]
      },
      '& + &': {
        isolate: false,
        marginLeft: space[1]
      }
    },
    isActive: {
      borderBottom: [[2, color.linkHover, 'solid']]
    }
  };
};
export var TabButtonRenderer = function TabButtonRenderer(_ref2) {
  var _cx;

  var classes = _ref2.classes,
      name = _ref2.name,
      className = _ref2.className,
      onClick = _ref2.onClick,
      active = _ref2.active,
      children = _ref2.children;
  var classNames = cx(classes.button, className, (_cx = {}, _cx[classes.isActive] = active, _cx));
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    name: name,
    className: classNames,
    onClick: onClick,
    "aria-pressed": active
  }, children);
};
TabButtonRenderer.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  active: PropTypes.bool,
  children: PropTypes.node.isRequired
};
TabButtonRenderer.defaultProps = {
  active: false
};
export default Styled(styles)(TabButtonRenderer);