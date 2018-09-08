import React from 'react';
import PropTypes from 'prop-types';
import RibbonRenderer from 'rsg-components/Ribbon/RibbonRenderer';

export default function Ribbon(props, _ref) {
  const config = _ref.config;
  const ribbon = config.ribbon;
  return ribbon ? React.createElement(RibbonRenderer, ribbon) : null;
}
Ribbon.contextTypes = {
  config: PropTypes.object
};