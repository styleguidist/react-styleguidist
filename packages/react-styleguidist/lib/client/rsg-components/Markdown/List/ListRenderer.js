import React, { Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Styled from 'rsg-components/Styled';

const styles = function styles(_ref) {
  const space = _ref.space;

      
const color = _ref.color;

      
const fontFamily = _ref.fontFamily;
  return {
    list: {
      marginTop: 0,
      marginBottom: space[2],
      paddingLeft: space[3],
      fontSize: 'inherit'
    },
    ordered: {
      listStyleType: 'decimal'
    },
    li: {
      color: color.base,
      fontFamily: fontFamily.base,
      fontSize: 'inherit',
      lineHeight: 1.5,
      listStyleType: 'inherit'
    }
  };
};

export function ListRenderer(_ref2) {
  const classes = _ref2.classes;

      
const ordered = _ref2.ordered;

      
const children = _ref2.children;
  const Tag = ordered ? 'ol' : 'ul';
  const classNames = cx(classes.list, ordered && classes.ordered);
  return React.createElement(Tag, {
    className: classNames
  }, Children.map(children, function (li) {
    return cloneElement(li, {
      className: classes.li
    });
  }));
}
ListRenderer.propTypes = {
  classes: PropTypes.object.isRequired,
  ordered: PropTypes.bool,
  children: PropTypes.node.isRequired
};
ListRenderer.defaultProps = {
  ordered: false
};
export default Styled(styles)(ListRenderer);