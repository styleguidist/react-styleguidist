import "core-js/modules/es.array.map";
import "core-js/modules/es.object.assign";
import "core-js/modules/es.string.small";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'clsx';
import Link from 'rsg-components/Link';
import Styled from 'rsg-components/Styled';
import { useStyleGuideContext } from 'rsg-components/Context';

var styles = function styles(_ref) {
  var _isChild;

  var color = _ref.color,
      fontFamily = _ref.fontFamily,
      fontSize = _ref.fontSize,
      space = _ref.space,
      mq = _ref.mq;
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
    isChild: (_isChild = {}, _isChild[mq.small] = {
      display: 'inline-block',
      margin: [[0, space[1], 0, 0]]
    }, _isChild),
    heading: {
      color: color.base,
      marginTop: space[1],
      fontFamily: fontFamily.base,
      fontWeight: 'bold'
    },
    isSelected: {
      fontWeight: 'bold'
    }
  };
};

var ComponentsListSectionRenderer = function ComponentsListSectionRenderer(_ref2) {
  var _cx;

  var classes = _ref2.classes,
      heading = _ref2.heading,
      visibleName = _ref2.visibleName,
      href = _ref2.href,
      content = _ref2.content,
      shouldOpenInNewTab = _ref2.shouldOpenInNewTab,
      selected = _ref2.selected,
      initialOpen = _ref2.initialOpen,
      forcedOpen = _ref2.forcedOpen;

  var _useStyleGuideContext = useStyleGuideContext(),
      tocMode = _useStyleGuideContext.config.tocMode;

  var _ref3 = tocMode !== 'collapse' ? [true, function () {}] : React.useState(!!initialOpen),
      open = _ref3[0],
      setOpen = _ref3[1];

  return /*#__PURE__*/React.createElement("li", {
    className: cx(classes.item, (_cx = {}, _cx[classes.isChild] = !content && !shouldOpenInNewTab, _cx[classes.isSelected] = selected, _cx)),
    key: href
  }, /*#__PURE__*/React.createElement(Link, {
    className: cx(heading && classes.heading),
    href: href,
    onClick: function onClick() {
      return setOpen(!open);
    },
    target: shouldOpenInNewTab ? '_blank' : undefined,
    "data-testid": "rsg-toc-link"
  }, visibleName), open || forcedOpen ? content : null);
};

export var ComponentsListRenderer = function ComponentsListRenderer(_ref4) {
  var classes = _ref4.classes,
      items = _ref4.items;
  return /*#__PURE__*/React.createElement("ul", {
    className: classes.list
  }, items.map(function (item) {
    return /*#__PURE__*/React.createElement(ComponentsListSectionRenderer, _extends({
      key: item.slug,
      classes: classes
    }, item));
  }));
};
ComponentsListRenderer.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
  items: PropTypes.array.isRequired
};
export default Styled(styles)(ComponentsListRenderer);