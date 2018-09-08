import React from 'react';
import PropTypes from 'prop-types';
import ReactComponent from 'rsg-components/ReactComponent';
import ComponentsRenderer from 'rsg-components/Components/ComponentsRenderer';

export default function Components(_ref) {
  const components = _ref.components;

      
const depth = _ref.depth;

      
const exampleMode = _ref.exampleMode;

      
const usageMode = _ref.usageMode;
  return React.createElement(ComponentsRenderer, null, components.map(function (component) {
    return React.createElement(ReactComponent, {
      key: component.filepath,
      component,
      exampleMode,
      usageMode,
      depth
    });
  }));
}
Components.propTypes = {
  components: PropTypes.array.isRequired,
  depth: PropTypes.number.isRequired,
  exampleMode: PropTypes.string.isRequired,
  usageMode: PropTypes.string.isRequired
};