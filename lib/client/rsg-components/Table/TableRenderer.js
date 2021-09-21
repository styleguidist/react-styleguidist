import "core-js/modules/es.array.map";
import "core-js/modules/es.string.small";
import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';
export var styles = function styles(_ref) {
  var space = _ref.space,
      color = _ref.color,
      fontFamily = _ref.fontFamily,
      fontSize = _ref.fontSize;
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
export var TableRenderer = function TableRenderer(_ref2) {
  var classes = _ref2.classes,
      columns = _ref2.columns,
      rows = _ref2.rows,
      getRowKey = _ref2.getRowKey;
  return /*#__PURE__*/React.createElement("table", {
    className: classes.table
  }, /*#__PURE__*/React.createElement("thead", {
    className: classes.tableHead
  }, /*#__PURE__*/React.createElement("tr", null, columns.map(function (_ref3) {
    var caption = _ref3.caption;
    return /*#__PURE__*/React.createElement("th", {
      key: caption,
      className: classes.cellHeading
    }, caption);
  }))), /*#__PURE__*/React.createElement("tbody", null, rows.map(function (row) {
    return /*#__PURE__*/React.createElement("tr", {
      key: getRowKey(row)
    }, columns.map(function (_ref4, index) {
      var render = _ref4.render;
      return /*#__PURE__*/React.createElement("td", {
        key: index,
        className: classes.cell
      }, render(row));
    }));
  })));
};
TableRenderer.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape({
    caption: PropTypes.string.isRequired,
    render: PropTypes.func.isRequired
  }).isRequired).isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  getRowKey: PropTypes.func.isRequired
};
export default Styled(styles)(TableRenderer);