import "core-js/modules/es6.object.assign";
import "core-js/modules/es6.function.name";

import React from 'react';
import PropTypes from 'prop-types';
import Argument from 'rsg-components/Argument';
import Heading from 'rsg-components/Heading';
import Styled from 'rsg-components/Styled';

function _extends() { _extends = Object.assign || function (target) { for (let i = 1; i < arguments.length; i++) { const source = arguments[i]; for (const key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
export var styles = function styles(_ref) {
  const space = _ref.space;
  return {
    root: {
      marginBottom: space[2],
      fontSize: 'inherit'
    },
    headingWrapper: {
      marginBottom: space[0]
    }
  };
};
export function ArgumentsRenderer(_ref2) {
  const classes = _ref2.classes;

      
const args = _ref2.args;

      
const heading = _ref2.heading;

  if (args.length === 0) {
    return null;
  }

  return React.createElement("div", {
    className: classes.root
  }, heading && React.createElement("div", {
    className: classes.headingWrapper
  }, React.createElement(Heading, {
    level: 5
  }, "Arguments")), args.map(function (arg) {
    return React.createElement(Argument, _extends({
      key: arg.name
    }, arg));
  }));
}
ArgumentsRenderer.propTypes = {
  classes: PropTypes.object.isRequired,
  args: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.object,
    description: PropTypes.string
  })).isRequired,
  heading: PropTypes.bool
};
export default Styled(styles)(ArgumentsRenderer);