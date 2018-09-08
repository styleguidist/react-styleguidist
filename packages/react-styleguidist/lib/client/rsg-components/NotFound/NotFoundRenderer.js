import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'rsg-components/Markdown';
import Styled from 'rsg-components/Styled';

const styles = function styles(_ref) {
  const maxWidth = _ref.maxWidth;
  return {
    root: {
      maxWidth,
      margin: [[0, 'auto']]
    }
  };
};

export function NotFoundRenderer(_ref2) {
  const classes = _ref2.classes;
  return React.createElement("div", {
    className: classes.root
  }, React.createElement(Markdown, {
    text: "\n# Page not found\nThe link you followed may be broken, or the page may have been removed.\n"
  }));
}
NotFoundRenderer.propTypes = {
  classes: PropTypes.object.isRequired
};
export default Styled(styles)(NotFoundRenderer);