import "core-js/modules/es6.object.assign";
import "core-js/modules/web.dom.iterable";
import "core-js/modules/es6.array.iterator";
import "core-js/modules/es6.object.keys";
import "core-js/modules/es6.function.name";

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Styled from 'rsg-components/Styled';

function _extends() { _extends = Object.assign || function (target) { for (let i = 1; i < arguments.length; i++) { const source = arguments[i]; for (const key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) {return {};} const target = _objectWithoutPropertiesLoose(source, excluded); let key; let i; if (Object.getOwnPropertySymbols) { const sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) {continue;} if (!Object.prototype.propertyIsEnumerable.call(source, key)) {continue;} target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) {return {};} const target = {}; const sourceKeys = Object.keys(source); let key; let i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) {continue;} target[key] = source[key]; } return target; }
export var styles = function styles(_ref) {
  const space = _ref.space;

      
const color = _ref.color;

      
const borderRadius = _ref.borderRadius;
  return {
    root: {
      marginBottom: space[4]
    },
    preview: {
      padding: space[2],
      border: [[1, color.border, 'solid']],
      borderRadius,
      // the next 2 lines are required to contain floated components
      width: '100%',
      display: 'inline-block'
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: space[1]
    },
    toolbar: {
      marginLeft: 'auto'
    },
    tab: {} // expose className to allow using it in 'styles' settings

  };
};
export function PlaygroundRenderer(_ref2) {
  const classes = _ref2.classes;

      
const name = _ref2.name;

      
const preview = _ref2.preview;

      
const previewProps = _ref2.previewProps;

      
const tabButtons = _ref2.tabButtons;

      
const tabBody = _ref2.tabBody;

      
const toolbar = _ref2.toolbar;

  const className = previewProps.className;

      
const props = _objectWithoutProperties(previewProps, ["className"]);

  return React.createElement("div", {
    className: classes.root
  }, React.createElement("div", _extends({
    className: cx(classes.preview, className)
  }, props, {
    "data-preview": name
  }), preview), React.createElement("div", {
    className: classes.controls
  }, React.createElement("div", {
    className: classes.tabs
  }, tabButtons), React.createElement("div", {
    className: classes.toolbar
  }, toolbar)), React.createElement("div", {
    className: classes.tab
  }, tabBody));
}
PlaygroundRenderer.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  preview: PropTypes.node.isRequired,
  previewProps: PropTypes.object.isRequired,
  tabButtons: PropTypes.node.isRequired,
  tabBody: PropTypes.node.isRequired,
  toolbar: PropTypes.node.isRequired
};
export default Styled(styles)(PlaygroundRenderer);