import "core-js/modules/es6.string.small";
import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';

const styles = function styles(_ref) {
  const fontFamily = _ref.fontFamily;

      
const fontSize = _ref.fontSize;

      
const color = _ref.color;
  return {
    root: {
      margin: 0,
      lineHeight: 1.2,
      fontSize: fontSize.small,
      fontFamily: fontFamily.monospace,
      color: color.error,
      whiteSpace: 'pre-wrap'
    }
  };
};

export function PlaygroundErrorRenderer(_ref2) {
  const classes = _ref2.classes;

      
const message = _ref2.message;
  return React.createElement("pre", {
    className: classes.root
  }, message);
}
PlaygroundErrorRenderer.propTypes = {
  classes: PropTypes.object.isRequired,
  message: PropTypes.string.isRequired
};
export default Styled(styles)(PlaygroundErrorRenderer);