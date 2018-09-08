import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';

const styles = function styles() {
  return {
    // Just default jss-isolate rules
    root: {}
  };
};

export function ExamplesRenderer(_ref) {
  const classes = _ref.classes;

      
const children = _ref.children;
  return React.createElement("article", {
    className: classes.root
  }, children);
}
ExamplesRenderer.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node
};
export default Styled(styles)(ExamplesRenderer);