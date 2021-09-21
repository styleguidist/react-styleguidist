import "core-js/modules/es.string.small";
import React from 'react';
import Tippy from '@tippyjs/react';
import Styled from 'rsg-components/Styled';
export var styles = function styles(_ref) {
  var space = _ref.space,
      color = _ref.color,
      borderRadius = _ref.borderRadius,
      fontSize = _ref.fontSize;
  return {
    tooltip: {
      '&.tippy-box': {
        transitionProperty: [['opacity']],
        '&[data-state="hidden"]': {
          opacity: 0
        }
      },
      '& .tippy-content': {
        padding: space[0],
        border: "1px " + color.border + " solid",
        borderRadius: borderRadius,
        background: color.baseBackground,
        boxShadow: [[0, 2, 4, 'rgba(0,0,0,.15)']],
        fontSize: fontSize.small,
        color: color.type
      }
    }
  };
};

function TooltipRenderer(_ref2) {
  var classes = _ref2.classes,
      children = _ref2.children,
      content = _ref2.content,
      _ref2$placement = _ref2.placement,
      placement = _ref2$placement === void 0 ? 'top' : _ref2$placement;
  return /*#__PURE__*/React.createElement(Tippy, {
    content: content,
    className: classes.tooltip,
    interactive: true,
    placement: placement,
    trigger: "click mouseenter focus",
    arrow: false
  }, /*#__PURE__*/React.createElement("span", {
    role: "button",
    tabIndex: 0
  }, children));
}

export default Styled(styles)(TooltipRenderer);