import React from 'react';
import RibbonRenderer from 'rsg-components/Ribbon/RibbonRenderer';
import { useStyleGuideContext } from 'rsg-components/Context';
export default function Ribbon() {
  var _useStyleGuideContext = useStyleGuideContext(),
      ribbon = _useStyleGuideContext.config.ribbon;

  return ribbon ? /*#__PURE__*/React.createElement(RibbonRenderer, ribbon) : null;
}