import "core-js/modules/es.string.small";
import React from 'react';
import PropTypes from 'prop-types';
import Logo from 'rsg-components/Logo';
import Markdown from 'rsg-components/Markdown';
import Styled from 'rsg-components/Styled';
import cx from 'clsx';
import Ribbon from 'rsg-components/Ribbon';
import Version from 'rsg-components/Version';

var styles = function styles(_ref) {
  var _hasSidebar, _content, _sidebar;

  var color = _ref.color,
      fontFamily = _ref.fontFamily,
      fontSize = _ref.fontSize,
      sidebarWidth = _ref.sidebarWidth,
      mq = _ref.mq,
      space = _ref.space,
      maxWidth = _ref.maxWidth;
  return {
    root: {
      minHeight: '100vh',
      backgroundColor: color.baseBackground
    },
    hasSidebar: (_hasSidebar = {
      paddingLeft: sidebarWidth
    }, _hasSidebar[mq.small] = {
      paddingLeft: 0
    }, _hasSidebar),
    content: (_content = {
      maxWidth: maxWidth,
      padding: [[space[2], space[4]]],
      margin: [[0, 'auto']]
    }, _content[mq.small] = {
      padding: space[2]
    }, _content.display = 'block', _content),
    sidebar: (_sidebar = {
      backgroundColor: color.sidebarBackground,
      border: [[color.border, 'solid']],
      borderWidth: [[0, 1, 0, 0]],
      position: 'fixed',
      top: 0,
      left: 0,
      bottom: 0,
      width: sidebarWidth,
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch'
    }, _sidebar[mq.small] = {
      position: 'static',
      width: 'auto',
      borderWidth: [[1, 0, 0, 0]],
      paddingBottom: space[0]
    }, _sidebar),
    logo: {
      padding: space[2],
      borderBottom: [[1, color.border, 'solid']]
    },
    footer: {
      display: 'block',
      color: color.light,
      fontFamily: fontFamily.base,
      fontSize: fontSize.small
    }
  };
};

export var StyleGuideRenderer = function StyleGuideRenderer(_ref2) {
  var classes = _ref2.classes,
      title = _ref2.title,
      version = _ref2.version,
      homepageUrl = _ref2.homepageUrl,
      children = _ref2.children,
      toc = _ref2.toc,
      hasSidebar = _ref2.hasSidebar;
  return /*#__PURE__*/React.createElement("div", {
    className: cx(classes.root, hasSidebar && classes.hasSidebar)
  }, /*#__PURE__*/React.createElement("main", {
    className: classes.content
  }, children, /*#__PURE__*/React.createElement("footer", {
    className: classes.footer
  }, /*#__PURE__*/React.createElement(Markdown, {
    text: "Created with [React Styleguidist](" + homepageUrl + ")"
  }))), hasSidebar && /*#__PURE__*/React.createElement("div", {
    className: classes.sidebar,
    "data-testid": "sidebar"
  }, /*#__PURE__*/React.createElement("header", {
    className: classes.logo
  }, /*#__PURE__*/React.createElement(Logo, null, title), version && /*#__PURE__*/React.createElement(Version, null, version)), toc), /*#__PURE__*/React.createElement(Ribbon, null));
};
StyleGuideRenderer.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
  title: PropTypes.string.isRequired,
  version: PropTypes.string,
  homepageUrl: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  toc: PropTypes.node.isRequired,
  hasSidebar: PropTypes.bool
};
export default Styled(styles)(StyleGuideRenderer);