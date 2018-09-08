import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';

const styles = function styles(_ref) {
  const space = _ref.space;

      
const color = _ref.color;

      
const fontSize = _ref.fontSize;

      
const fontFamily = _ref.fontFamily;
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

export function TableCellRenderer(_ref2) {
  const classes = _ref2.classes;

      
const header = _ref2.header;

      
const children = _ref2.children;

  if (header) {
    return React.createElement("th", {
      className: classes.th
    }, children);
  }

  return React.createElement("td", {
    className: classes.td
  }, children);
}
TableCellRenderer.propTypes = {
  classes: PropTypes.object.isRequired,
  header: PropTypes.bool,
  children: PropTypes.node.isRequired
};
TableCellRenderer.defaultProps = {
  header: false
};
export default Styled(styles)(TableCellRenderer);