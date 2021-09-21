import React from 'react';
import PropTypes from 'prop-types';
import cx from 'clsx';
import Heading from 'rsg-components/Heading';
import Styled from 'rsg-components/Styled';

var styles = function styles(_ref) {
  var color = _ref.color,
      space = _ref.space;
  return {
    wrapper: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: space[1]
    },
    toolbar: {
      marginLeft: 'auto'
    },
    sectionName: {
      '&:hover, &:active': {
        isolate: false,
        textDecoration: 'underline',
        cursor: 'pointer'
      }
    },
    isDeprecated: {
      color: color.light,
      '&, &:hover': {
        textDecoration: 'line-through'
      }
    }
  };
};

var SectionHeadingRenderer = function SectionHeadingRenderer(_ref2) {
  var _cx;

  var classes = _ref2.classes,
      children = _ref2.children,
      toolbar = _ref2.toolbar,
      id = _ref2.id,
      href = _ref2.href,
      depth = _ref2.depth,
      deprecated = _ref2.deprecated;
  var headingLevel = Math.min(6, depth);
  var sectionNameClasses = cx(classes.sectionName, (_cx = {}, _cx[classes.isDeprecated] = deprecated, _cx));
  return /*#__PURE__*/React.createElement("div", {
    className: classes.wrapper
  }, /*#__PURE__*/React.createElement(Heading, {
    level: headingLevel,
    id: id
  }, /*#__PURE__*/React.createElement("a", {
    href: href,
    className: sectionNameClasses
  }, children)), /*#__PURE__*/React.createElement("div", {
    className: classes.toolbar
  }, toolbar));
};

SectionHeadingRenderer.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
  children: PropTypes.node,
  toolbar: PropTypes.node,
  id: PropTypes.string.isRequired,
  href: PropTypes.string,
  depth: PropTypes.number.isRequired,
  deprecated: PropTypes.bool
};
export default Styled(styles)(SectionHeadingRenderer);