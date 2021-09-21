import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';

var styles = function styles(_ref) {
  var space = _ref.space,
      color = _ref.color,
      fontSize = _ref.fontSize,
      fontFamily = _ref.fontFamily;
  return {
    td: {
      padding: [[space[0], space[2], space[0], 0]],
      fontFamily: fontFamily.base,
      fontSize: fontSize.base,
      color: color.base,
      lineHeight: 1.5
    },
    th: {
      composes: '$td',
      fontWeight: 'bold'
    }
  };
};

export var TableCellRenderer = function TableCellRenderer(_ref2) {
  var classes = _ref2.classes,
      header = _ref2.header,
      children = _ref2.children;

  if (header) {
    return /*#__PURE__*/React.createElement("th", {
      className: classes.th
    }, children);
  }

  return /*#__PURE__*/React.createElement("td", {
    className: classes.td
  }, children);
};
TableCellRenderer.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
  header: PropTypes.bool,
  children: PropTypes.node.isRequired
};
TableCellRenderer.defaultProps = {
  header: false
};
export default Styled(styles)(TableCellRenderer);