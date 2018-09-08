import "core-js/modules/es6.object.assign";
import "core-js/modules/web.dom.iterable";
import "core-js/modules/es6.array.iterator";
import "core-js/modules/es6.object.keys";

import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';

function _extends() { _extends = Object.assign || function (target) { for (let i = 1; i < arguments.length; i++) { const source = arguments[i]; for (const key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) {return {};} const target = _objectWithoutPropertiesLoose(source, excluded); let key; let i; if (Object.getOwnPropertySymbols) { const sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) {continue;} if (!Object.prototype.propertyIsEnumerable.call(source, key)) {continue;} target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) {return {};} const target = {}; const sourceKeys = Object.keys(source); let key; let i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) {continue;} target[key] = source[key]; } return target; }

const styles = function styles() {
  return {
    input: {
      isolate: false,
      display: 'inline-block',
      verticalAlign: 'middle'
    }
  };
};

export function CheckboxRenderer(_ref) {
  const classes = _ref.classes;

      
const rest = _objectWithoutProperties(_ref, ["classes"]);

  return React.createElement("input", _extends({}, rest, {
    type: "checkbox",
    className: classes.input
  }));
}
CheckboxRenderer.propTypes = {
  classes: PropTypes.object.isRequired
};
export default Styled(styles)(CheckboxRenderer);