import "core-js/modules/es.object.to-string";
import "core-js/modules/es.regexp.to-string";
import "core-js/modules/es.string.small";
import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';

var styles = function styles(_ref) {
  var fontFamily = _ref.fontFamily,
      fontSize = _ref.fontSize,
      color = _ref.color,
      space = _ref.space;
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

export var ErrorRenderer = function ErrorRenderer(_ref2) {
  var classes = _ref2.classes,
      error = _ref2.error,
      info = _ref2.info;
  return /*#__PURE__*/React.createElement("div", {
    className: classes.root
  }, /*#__PURE__*/React.createElement("pre", {
    className: classes.stack
  }, error.toString(), info.componentStack), /*#__PURE__*/React.createElement("div", {
    className: classes.message
  }, /*#__PURE__*/React.createElement("p", null, "This may be due to an error in a component you are overriding, or a bug in React Styleguidist."), /*#__PURE__*/React.createElement("p", null, "If you believe this is a bug,\xA0", /*#__PURE__*/React.createElement("a", {
    style: {
      color: 'inherit'
    },
    href: "https://github.com/styleguidist/react-styleguidist/issues"
  }, "please submit an issue"), ".")));
};
ErrorRenderer.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
  error: PropTypes.object.isRequired,
  info: PropTypes.any.isRequired
};
export default Styled(styles)(ErrorRenderer);