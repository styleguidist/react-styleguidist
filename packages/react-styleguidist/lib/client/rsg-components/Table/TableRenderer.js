import "core-js/modules/es6.string.small";
import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';

export var styles = function styles(_ref) {
  const space = _ref.space;

      
const color = _ref.color;

      
const fontFamily = _ref.fontFamily;

      
const fontSize = _ref.fontSize;
  return {
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginBottom: space[4]
    },
    tableHead: {
      borderBottom: [[1, color.border, 'solid']]
    },
    cellHeading: {
      color: color.base,
      paddingRight: space[2],
      paddingBottom: space[1],
      textAlign: 'left',
      fontFamily: fontFamily.base,
      fontWeight: 'bold',
      fontSize: fontSize.small,
      whiteSpace: 'nowrap'
    },
    cell: {
      color: color.base,
      paddingRight: space[2],
      paddingTop: space[1],
      paddingBottom: space[1],
      verticalAlign: 'top',
      fontFamily: fontFamily.base,
      fontSize: fontSize.small,
      '&:last-child': {
        isolate: false,
        width: '99%',
        paddingRight: 0
      },
      '& p:last-child': {
        isolate: false,
        marginBottom: 0
      }
    }
  };
};
export function TableRenderer(_ref2) {
  const classes = _ref2.classes;

      
const columns = _ref2.columns;

      
const rows = _ref2.rows;

      
const getRowKey = _ref2.getRowKey;
  return React.createElement("table", {
    className: classes.table
  }, React.createElement("thead", {
    className: classes.tableHead
  }, React.createElement("tr", null, columns.map(function (_ref3) {
    const caption = _ref3.caption;
    return React.createElement("th", {
      key: caption,
      className: classes.cellHeading
    }, caption);
  }))), React.createElement("tbody", null, rows.map(function (row) {
    return React.createElement("tr", {
      key: getRowKey(row)
    }, columns.map(function (_ref4, index) {
      const render = _ref4.render;
      return React.createElement("td", {
        key: index,
        className: classes.cell
      }, render(row));
    }));
  })));
}
TableRenderer.propTypes = {
  classes: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape({
    caption: PropTypes.string.isRequired,
    render: PropTypes.func.isRequired
  })).isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  getRowKey: PropTypes.func.isRequired
};
export default Styled(styles)(TableRenderer);