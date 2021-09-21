import "core-js/modules/es.regexp.exec";
import "core-js/modules/es.string.search";
import "core-js/modules/es.string.link";
import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';

var styles = function styles(_ref) {
  var space = _ref.space,
      color = _ref.color,
      fontFamily = _ref.fontFamily,
      fontSize = _ref.fontSize,
      borderRadius = _ref.borderRadius;
  return {
    root: {
      fontFamily: fontFamily.base
    },
    search: {
      padding: space[2]
    },
    input: {
      display: 'block',
      width: '100%',
      padding: space[1],
      color: color.base,
      backgroundColor: color.baseBackground,
      fontFamily: fontFamily.base,
      fontSize: fontSize.base,
      border: [[1, color.border, 'solid']],
      borderRadius: borderRadius,
      transition: 'all ease-in-out .1s',
      '&:focus': {
        isolate: false,
        borderColor: color.link,
        boxShadow: [[0, 0, 0, 2, color.focus]],
        outline: 0
      },
      '&::placeholder': {
        isolate: false,
        fontFamily: fontFamily.base,
        fontSize: fontSize.base,
        color: color.light
      }
    }
  };
};

export var TableOfContentsRenderer = function TableOfContentsRenderer(_ref2) {
  var classes = _ref2.classes,
      children = _ref2.children,
      searchTerm = _ref2.searchTerm,
      onSearchTermChange = _ref2.onSearchTermChange;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: classes.root
  }, /*#__PURE__*/React.createElement("nav", null, /*#__PURE__*/React.createElement("div", {
    className: classes.search
  }, /*#__PURE__*/React.createElement("input", {
    value: searchTerm,
    className: classes.input,
    placeholder: "Filter by name",
    "aria-label": "Filter by name",
    onChange: function onChange(event) {
      return onSearchTermChange(event.target.value);
    }
  })), children)));
};
TableOfContentsRenderer.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
  children: PropTypes.node,
  searchTerm: PropTypes.string.isRequired,
  onSearchTermChange: PropTypes.func.isRequired
};
export default Styled(styles)(TableOfContentsRenderer);