import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';

const styles = function styles(_ref) {
  const color = _ref.color;

      
const fontFamily = _ref.fontFamily;

      
const fontSize = _ref.fontSize;
  return {
    version: {
      color: color.light,
      margin: [[5, 0, 0, 0]],
      fontFamily: fontFamily.base,
      fontSize: fontSize.base,
      fontWeight: 'normal'
    }
  };
};

export function VersionRenderer(_ref2) {
  const classes = _ref2.classes;

      
const children = _ref2.children;
  return React.createElement("p", {
    "aria-label": "version",
    className: classes.version
  }, children);
}
VersionRenderer.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node
};
export default Styled(styles)(VersionRenderer);