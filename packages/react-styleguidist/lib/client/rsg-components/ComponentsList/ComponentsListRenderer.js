import "core-js/modules/es6.string.small";

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Link from 'rsg-components/Link';
import Styled from 'rsg-components/Styled';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const styles = function styles(_ref) {
  const color = _ref.color;

      
const fontFamily = _ref.fontFamily;

      
const fontSize = _ref.fontSize;

      
const space = _ref.space;

      
const mq = _ref.mq;
  return {
    list: {
      margin: 0,
      paddingLeft: space[2]
    },
    item: {
      color: color.base,
      display: 'block',
      margin: [[space[1], 0, space[1], 0]],
      fontFamily: fontFamily.base,
      fontSize: fontSize.base,
      listStyle: 'none',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    },
    isChild: _defineProperty({}, mq.small, {
      display: 'inline-block',
      margin: [[0, space[1], 0, 0]]
    }),
    heading: {
      color: color.base,
      marginTop: space[1],
      fontFamily: fontFamily.base,
      fontWeight: 'bold'
    }
  };
};

export function ComponentsListRenderer(_ref2) {
  const classes = _ref2.classes;

      
let items = _ref2.items;
  items = items.filter(function (item) {
    return item.visibleName;
  });

  if (!items.length) {
    return null;
  }

  return React.createElement("ul", {
    className: classes.list
  }, items.map(function (_ref3) {
    const heading = _ref3.heading;

        
const visibleName = _ref3.visibleName;

        
const href = _ref3.href;

        
const content = _ref3.content;
    return React.createElement("li", {
      className: cx(classes.item, (!content || !content.props.items.length) && classes.isChild),
      key: href
    }, React.createElement(Link, {
      className: cx(heading && classes.heading),
      href
    }, visibleName), content);
  }));
}
ComponentsListRenderer.propTypes = {
  items: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired
};
export default Styled(styles)(ComponentsListRenderer);