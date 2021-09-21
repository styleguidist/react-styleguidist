import "core-js/modules/es.array.join";
import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'rsg-components/Markdown';
import Styled from 'rsg-components/Styled';

var styles = function styles(_ref) {
  var space = _ref.space;
  return {
    root: {
      marginBottom: space[4]
    }
  };
};

export var MessageRenderer = function MessageRenderer(_ref2) {
  var classes = _ref2.classes,
      children = _ref2.children;
  return /*#__PURE__*/React.createElement("div", {
    className: classes.root
  }, /*#__PURE__*/React.createElement(Markdown, {
    text: Array.isArray(children) ? children.join('\n') : typeof children === 'string' ? children : ''
  }));
};
MessageRenderer.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
  children: PropTypes.node.isRequired
};
export default Styled(styles)(MessageRenderer);