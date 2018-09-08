import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';
import Heading from 'rsg-components/Heading';

const styles = function styles(_ref) {
  const space = _ref.space;
  return {
    spacing: {
      marginBottom: space[2]
    }
  };
};

function MarkdownHeadingRenderer(_ref2) {
  const classes = _ref2.classes;

      
const level = _ref2.level;

      
const children = _ref2.children;
  return React.createElement("div", {
    className: classes.spacing
  }, React.createElement(Heading, {
    level
  }, children));
}

MarkdownHeadingRenderer.propTypes = {
  classes: PropTypes.object.isRequired,
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]).isRequired,
  children: PropTypes.node
};
export default Styled(styles)(MarkdownHeadingRenderer);