import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';

export var styles = function styles(_ref) {
  const space = _ref.space;

      
const color = _ref.color;

      
const fontFamily = _ref.fontFamily;
  return {
    para: {
      marginTop: 0,
      marginBottom: space[2],
      color: color.base,
      fontFamily: fontFamily.base,
      fontSize: 'inherit',
      lineHeight: 1.5
    }
  };
};
export function ParaRenderer(_ref2) {
  const classes = _ref2.classes;

      
const semantic = _ref2.semantic;

      
const children = _ref2.children;
  const Tag = semantic || 'div';
  return React.createElement(Tag, {
    className: classes.para
  }, children);
}
ParaRenderer.propTypes = {
  classes: PropTypes.object.isRequired,
  semantic: PropTypes.oneOf(['p']),
  children: PropTypes.node.isRequired
};
export default Styled(styles)(ParaRenderer);