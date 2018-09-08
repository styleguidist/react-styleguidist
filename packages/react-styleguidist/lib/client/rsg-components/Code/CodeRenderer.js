import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Styled from 'rsg-components/Styled';

const styles = function styles(_ref) {
  const fontFamily = _ref.fontFamily;
  return {
    code: {
      fontFamily: fontFamily.monospace,
      fontSize: 'inherit',
      color: 'inherit',
      background: 'transparent',
      whiteSpace: 'inherit'
    }
  };
};

export function CodeRenderer(_ref2) {
  const classes = _ref2.classes;

      
const className = _ref2.className;

      
const children = _ref2.children;
  const classNames = cx(className, classes.code);
  const isHighlighted = className && className.indexOf('lang-') !== -1;

  if (isHighlighted) {
    return React.createElement("code", {
      className: classNames,
      dangerouslySetInnerHTML: {
        __html: children
      }
    });
  }

  return React.createElement("code", {
    className: classNames
  }, children);
}
CodeRenderer.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};
export default Styled(styles)(CodeRenderer);