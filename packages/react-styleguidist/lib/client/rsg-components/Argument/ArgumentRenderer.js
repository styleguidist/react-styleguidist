import "core-js/modules/es6.object.assign";
import "core-js/modules/web.dom.iterable";
import "core-js/modules/es6.array.iterator";
import "core-js/modules/es6.object.keys";
import "core-js/modules/es6.function.name";

import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';
import Markdown from 'rsg-components/Markdown';
import Name from 'rsg-components/Name';
import Type from 'rsg-components/Type';
import Group from 'react-group';

function _extends() { _extends = Object.assign || function (target) { for (let i = 1; i < arguments.length; i++) { const source = arguments[i]; for (const key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) {return {};} const target = _objectWithoutPropertiesLoose(source, excluded); let key; let i; if (Object.getOwnPropertySymbols) { const sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) {continue;} if (!Object.prototype.propertyIsEnumerable.call(source, key)) {continue;} target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) {return {};} const target = {}; const sourceKeys = Object.keys(source); let key; let i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) {continue;} target[key] = source[key]; } return target; }
export var styles = function styles(_ref) {
  const space = _ref.space;
  return {
    block: {
      marginBottom: space[2]
    }
  };
};
export function ArgumentRenderer(_ref2) {
  const classes = _ref2.classes;

      
const name = _ref2.name;

      
const type = _ref2.type;

      
const description = _ref2.description;

      
const returns = _ref2.returns;

      
const block = _ref2.block;

      
const props = _objectWithoutProperties(_ref2, ["classes", "name", "type", "description", "returns", "block"]);

  return React.createElement(Group, _extends({
    className: block && classes.block
  }, props), returns && 'Returns', name && React.createElement("span", null, React.createElement(Name, null, name), type && ':'), type && React.createElement(Type, null, type.name), type && description && " \u2014 ", description && React.createElement(Markdown, {
    text: "".concat(description),
    inline: true
  }));
}
ArgumentRenderer.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string,
  type: PropTypes.object,
  description: PropTypes.string,
  returns: PropTypes.bool,
  block: PropTypes.bool
};
export default Styled(styles)(ArgumentRenderer);