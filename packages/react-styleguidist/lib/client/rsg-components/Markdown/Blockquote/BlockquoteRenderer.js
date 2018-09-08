import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Styled from 'rsg-components/Styled';

const styles = function styles(_ref) {
  const space = _ref.space;

      
const color = _ref.color;

      
const fontSize = _ref.fontSize;

      
const fontFamily = _ref.fontFamily;
  return {
    blockquote: {
      margin: [[space[2], space[4]]],
      padding: 0,
      color: color.base,
      fontFamily: fontFamily.base,
      fontSize: fontSize.base,
      lineHeight: 1.5
    }
  };
};

export function BlockquoteRenderer(_ref2) {
  const classes = _ref2.classes;

      
const className = _ref2.className;

      
const children = _ref2.children;
  const blockquoteClasses = cx(classes.blockquote, className);
  return React.createElement("blockquote", {
    className: blockquoteClasses
  }, children);
}
BlockquoteRenderer.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};
export default Styled(styles)(BlockquoteRenderer);