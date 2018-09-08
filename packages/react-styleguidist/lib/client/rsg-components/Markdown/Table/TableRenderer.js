import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';

const styles = function styles(_ref) {
  const space = _ref.space;
  return {
    table: {
      marginTop: 0,
      marginBottom: space[2],
      borderCollapse: 'collapse'
    }
  };
};

export function TableRenderer(_ref2) {
  const classes = _ref2.classes;

      
const children = _ref2.children;
  return React.createElement("table", {
    className: classes.table
  }, children);
}
TableRenderer.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired
};
export default Styled(styles)(TableRenderer);