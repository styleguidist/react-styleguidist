import "core-js/modules/es.array.map";
import "core-js/modules/es.function.name";
import "core-js/modules/es.object.assign";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';
import Argument from 'rsg-components/Argument';
import Heading from 'rsg-components/Heading';
export var styles = function styles(_ref) {
  var space = _ref.space;
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
export var ArgumentsRenderer = function ArgumentsRenderer(_ref2) {
  var classes = _ref2.classes,
      args = _ref2.args,
      heading = _ref2.heading;

  if (args.length === 0) {
    return null;
  }

  return /*#__PURE__*/React.createElement("div", {
    className: classes.root
  }, heading && /*#__PURE__*/React.createElement("div", {
    className: classes.headingWrapper
  }, /*#__PURE__*/React.createElement(Heading, {
    level: 5
  }, "Arguments")), args.map(function (arg) {
    return /*#__PURE__*/React.createElement(Argument, _extends({
      key: arg.name
    }, arg));
  }));
};
ArgumentsRenderer.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
  args: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.object,
    description: PropTypes.string
  }).isRequired).isRequired,
  heading: PropTypes.bool
};
export default Styled(styles)(ArgumentsRenderer);