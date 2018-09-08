import "core-js/modules/es6.regexp.to-string";
import "core-js/modules/es6.string.small";
import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';

const styles = function styles(_ref) {
  const fontFamily = _ref.fontFamily;

      
const fontSize = _ref.fontSize;

      
const color = _ref.color;

      
const space = _ref.space;
  return {
    root: {
      margin: space[2],
      lineHeight: 1.2,
      fontSize: fontSize.small
    },
    stack: {
      color: color.error,
      whiteSpace: 'pre-wrap',
      fontFamily: fontFamily.monospace
    },
    message: {
      color: color.error,
      fontFamily: fontFamily.base
    }
  };
};

export function ErrorRenderer(_ref2) {
  const classes = _ref2.classes;

      
const error = _ref2.error;

      
const info = _ref2.info;
  return React.createElement("div", {
    className: classes.root
  }, React.createElement("pre", {
    className: classes.stack
  }, error.toString(), info.componentStack.toString()), React.createElement("div", {
    className: classes.message
  }, React.createElement("p", null, "This may be due to an error in a component you are overriding, or a bug in React Styleguidist."), React.createElement("p", null, "If you believe this is a bug,\xA0", React.createElement("a", {
    style: {
      color: 'inherit'
    },
    href: "https://github.com/styleguidist/react-styleguidist/issues"
  }, "please submit an issue"), ".")));
}
ErrorRenderer.propTypes = {
  classes: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
  info: PropTypes.shape({
    componentStack: PropTypes.any.isRequired
  }).isRequired
};
export default Styled(styles)(ErrorRenderer);