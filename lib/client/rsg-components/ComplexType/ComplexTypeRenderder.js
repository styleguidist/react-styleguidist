import "core-js/modules/es.function.name";
import React from 'react';
import Styled from 'rsg-components/Styled';
import { MdInfoOutline } from 'react-icons/md';
import Text from 'rsg-components/Text';
import Tooltip from 'rsg-components/Tooltip';
export var styles = function styles(_ref) {
  var space = _ref.space;
  return {
    complexType: {
      alignItems: 'center',
      display: 'inline-flex'
    },
    name: {
      flexShrink: 0
    },
    icon: {
      marginLeft: space[0],
      flexShrink: 0
    }
  };
};

function ComplexTypeRenderer(_ref2) {
  var classes = _ref2.classes,
      name = _ref2.name,
      raw = _ref2.raw;
  return /*#__PURE__*/React.createElement(Tooltip, {
    placement: "right",
    content: raw
  }, /*#__PURE__*/React.createElement("span", {
    className: classes.complexType
  }, /*#__PURE__*/React.createElement("span", {
    className: classes.name
  }, /*#__PURE__*/React.createElement(Text, null, name)), /*#__PURE__*/React.createElement(MdInfoOutline, {
    className: classes.icon
  })));
}

export default Styled(styles)(ComplexTypeRenderer);