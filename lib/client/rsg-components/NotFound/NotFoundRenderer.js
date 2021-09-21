import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'rsg-components/Markdown';
import Styled from 'rsg-components/Styled';

var styles = function styles(_ref) {
  var maxWidth = _ref.maxWidth;
  return {
    root: {
      maxWidth: maxWidth,
      margin: [[0, 'auto']]
    }
  };
};

export var NotFoundRenderer = function NotFoundRenderer(_ref2) {
  var classes = _ref2.classes;
  return /*#__PURE__*/React.createElement("div", {
    className: classes.root
  }, /*#__PURE__*/React.createElement(Markdown, {
    text: "\n# Page not found\nThe link you followed may be broken, or the page may have been removed.\n"
  }));
};
NotFoundRenderer.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string.isRequired).isRequired
};
export default Styled(styles)(NotFoundRenderer);