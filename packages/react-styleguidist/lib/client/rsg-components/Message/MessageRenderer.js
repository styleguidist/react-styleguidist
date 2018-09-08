import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'rsg-components/Markdown';
import Styled from 'rsg-components/Styled';

const styles = function styles(_ref) {
  const space = _ref.space;
  return {
    root: {
      marginBottom: space[4]
    }
  };
};

export function MessageRenderer(_ref2) {
  const classes = _ref2.classes;

      
const children = _ref2.children;
  return React.createElement("div", {
    className: classes.root
  }, React.createElement(Markdown, {
    text: Array.isArray(children) ? children.join('\n') : children
  }));
}
MessageRenderer.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired
};
export default Styled(styles)(MessageRenderer);