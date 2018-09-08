import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';

const styles = function styles(_ref) {
  const color = _ref.color;
  return {
    thead: {
      borderBottom: [[1, color.border, 'solid']]
    }
  };
};

export function TableHeadRenderer(_ref2) {
  const classes = _ref2.classes;

      
const children = _ref2.children;
  return React.createElement("thead", {
    className: classes.thead
  }, children);
}
TableHeadRenderer.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired
};
export default Styled(styles)(TableHeadRenderer);