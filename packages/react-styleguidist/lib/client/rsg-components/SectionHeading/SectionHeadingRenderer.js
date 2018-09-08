import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Heading from 'rsg-components/Heading';
import Styled from 'rsg-components/Styled';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function SectionHeadingRenderer(_ref) {
  const classes = _ref.classes;

      
const children = _ref.children;

      
const toolbar = _ref.toolbar;

      
const id = _ref.id;

      
const href = _ref.href;

      
const depth = _ref.depth;

      
const deprecated = _ref.deprecated;
  const headingLevel = Math.min(6, depth);
  const sectionNameClasses = cx(classes.sectionName, _defineProperty({}, classes.isDeprecated, deprecated));
  return React.createElement("div", {
    className: classes.wrapper
  }, React.createElement(Heading, {
    level: headingLevel,
    id
  }, React.createElement("a", {
    href,
    className: sectionNameClasses
  }, children)), React.createElement("div", {
    className: classes.toolbar
  }, toolbar));
}

const styles = function styles(_ref2) {
  const color = _ref2.color;

      
const space = _ref2.space;
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

SectionHeadingRenderer.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
  toolbar: PropTypes.node,
  id: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  depth: PropTypes.number.isRequired,
  deprecated: PropTypes.bool
};
export default Styled(styles)(SectionHeadingRenderer);