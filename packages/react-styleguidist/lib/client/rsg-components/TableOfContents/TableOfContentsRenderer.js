import "core-js/modules/es6.regexp.search";
import "core-js/modules/es6.string.link";
import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';

const styles = function styles(_ref) {
  const space = _ref.space;

      
const color = _ref.color;

      
const fontFamily = _ref.fontFamily;

      
const fontSize = _ref.fontSize;

      
const borderRadius = _ref.borderRadius;
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
      borderRadius,
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

export function TableOfContentsRenderer(_ref2) {
  const classes = _ref2.classes;

      
const children = _ref2.children;

      
const searchTerm = _ref2.searchTerm;

      
const onSearchTermChange = _ref2.onSearchTermChange;
  return React.createElement("div", null, React.createElement("div", {
    className: classes.root
  }, React.createElement("div", {
    className: classes.search
  }, React.createElement("input", {
    value: searchTerm,
    className: classes.input,
    placeholder: "Filter by name",
    "aria-label": "Filter by name",
    onChange: function onChange(event) {
      return onSearchTermChange(event.target.value);
    }
  })), React.createElement("nav", null, children)));
}
TableOfContentsRenderer.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
  searchTerm: PropTypes.string.isRequired,
  onSearchTermChange: PropTypes.func.isRequired
};
export default Styled(styles)(TableOfContentsRenderer);