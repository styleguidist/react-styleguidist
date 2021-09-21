import "core-js/modules/es.array.map";
import React from 'react';
import PropTypes from 'prop-types';
import ReactComponent from 'rsg-components/ReactComponent';
import ComponentsRenderer from 'rsg-components/Components/ComponentsRenderer';

var Components = function Components(_ref) {
  var components = _ref.components,
      depth = _ref.depth,
      exampleMode = _ref.exampleMode,
      usageMode = _ref.usageMode;
  return /*#__PURE__*/React.createElement(ComponentsRenderer, null, components.map(function (component) {
    return /*#__PURE__*/React.createElement(ReactComponent, {
      key: component.filepath,
      component: component,
      exampleMode: exampleMode,
      usageMode: usageMode,
      depth: depth
    });
  }));
};

Components.propTypes = {
  components: PropTypes.array.isRequired,
  depth: PropTypes.number.isRequired,
  exampleMode: PropTypes.string.isRequired,
  usageMode: PropTypes.string.isRequired
};
export default Components;