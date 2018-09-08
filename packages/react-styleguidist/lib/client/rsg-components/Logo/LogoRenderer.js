import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';

const styles = function styles(_ref) {
  const color = _ref.color;

      
const fontFamily = _ref.fontFamily;

      
const fontSize = _ref.fontSize;
  return {
    logo: {
      color: color.base,
      margin: 0,
      fontFamily: fontFamily.base,
      fontSize: fontSize.h4,
      fontWeight: 'normal'
    }
  };
};

export function LogoRenderer(_ref2) {
  const classes = _ref2.classes;

      
const children = _ref2.children;
  return React.createElement("h1", {
    className: classes.logo
  }, children);
}
LogoRenderer.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node
};
export default Styled(styles)(LogoRenderer);