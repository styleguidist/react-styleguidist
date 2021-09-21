import "core-js/modules/es.function.name";
import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';

var styles = function styles() {
  return {
    // Just default jss-isolate rules
    root: {}
  };
};

export var ExamplesRenderer = function ExamplesRenderer(_ref) {
  var classes = _ref.classes,
      name = _ref.name,
      children = _ref.children;
  return /*#__PURE__*/React.createElement("article", {
    className: classes.root,
    "data-testid": name + "-examples"
  }, children);
};
ExamplesRenderer.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
  name: PropTypes.string.isRequired,
  children: PropTypes.node
};
export default Styled(styles)(ExamplesRenderer);