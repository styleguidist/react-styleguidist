import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';

const styles = function styles() {
  return {
    // Just default jss-isolate rules
    root: {}
  };
};

export function SectionsRenderer(_ref) {
  const classes = _ref.classes;

      
const children = _ref.children;
  return React.createElement("section", {
    className: classes.root
  }, children);
}
SectionsRenderer.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node
};
export default Styled(styles)(SectionsRenderer);