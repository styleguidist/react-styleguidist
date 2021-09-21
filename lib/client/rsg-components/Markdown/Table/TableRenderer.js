import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';

var styles = function styles(_ref) {
  var space = _ref.space;
  return {
    table: {
      marginTop: 0,
      marginBottom: space[2],
      borderCollapse: 'collapse'
    }
  };
};

export var TableRenderer = function TableRenderer(_ref2) {
  var classes = _ref2.classes,
      children = _ref2.children;
  return /*#__PURE__*/React.createElement("table", {
    className: classes.table
  }, children);
};
TableRenderer.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
  children: PropTypes.node.isRequired
};
export default Styled(styles)(TableRenderer);