import "core-js/modules/es6.string.small";

import React from 'react';
import PropTypes from 'prop-types';
import Logo from 'rsg-components/Logo';
import Markdown from 'rsg-components/Markdown';
import Styled from 'rsg-components/Styled';
import cx from 'classnames';
import Ribbon from 'rsg-components/Ribbon';
import Version from 'rsg-components/Version';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const styles = function styles(_ref) {
  let _content;

  const color = _ref.color;

      
const fontFamily = _ref.fontFamily;

      
const fontSize = _ref.fontSize;

      
const sidebarWidth = _ref.sidebarWidth;

      
const mq = _ref.mq;

      
const space = _ref.space;

      
const maxWidth = _ref.maxWidth;
  return {
    root: {
      minHeight: '100vh',
      backgroundColor: color.baseBackground
    },
    hasSidebar: _defineProperty({
      paddingLeft: sidebarWidth
    }, mq.small, {
      paddingLeft: 0
    }),
    content: (_content = {
      maxWidth,
      padding: [[space[2], space[4]]],
      margin: [[0, 'auto']]
    }, _defineProperty(_content, mq.small, {
      padding: space[2]
    }), _defineProperty(_content, "display", 'block'), _content),
    sidebar: _defineProperty({
      backgroundColor: color.sidebarBackground,
      border: [[color.border, 'solid']],
      borderWidth: [[0, 1, 0, 0]],
      position: 'fixed',
      top: 0,
      left: 0,
      bottom: 0,
      width: sidebarWidth,
      overflow: 'auto',
      '-webkit-overflow-scrolling': 'touch'
    }, mq.small, {
      position: 'static',
      width: 'auto',
      borderWidth: [[1, 0, 0, 0]],
      paddingBottom: space[0]
    }),
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

export function StyleGuideRenderer(_ref2) {
  const classes = _ref2.classes;

      
const title = _ref2.title;

      
const version = _ref2.version;

      
const homepageUrl = _ref2.homepageUrl;

      
const children = _ref2.children;

      
const toc = _ref2.toc;

      
const hasSidebar = _ref2.hasSidebar;
  return React.createElement("div", {
    className: cx(classes.root, hasSidebar && classes.hasSidebar)
  }, React.createElement("main", {
    className: classes.content
  }, children, React.createElement("footer", {
    className: classes.footer
  }, React.createElement(Markdown, {
    text: "Generated with [React Styleguidist](".concat(homepageUrl, ")")
  }))), hasSidebar && React.createElement("div", {
    className: classes.sidebar
  }, React.createElement("div", {
    className: classes.logo
  }, React.createElement(Logo, null, title), version && React.createElement(Version, null, version)), toc), React.createElement(Ribbon, null));
}
StyleGuideRenderer.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  version: PropTypes.string,
  homepageUrl: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  toc: PropTypes.node.isRequired,
  hasSidebar: PropTypes.bool
};
export default Styled(styles)(StyleGuideRenderer);