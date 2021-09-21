import "core-js/modules/es.array.index-of";
import "core-js/modules/es.object.assign";
import "core-js/modules/es.object.keys";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';

var styles = function styles() {
  return {
    input: {
      isolate: false,
      display: 'inline-block',
      verticalAlign: 'middle'
    }
  };
};

export var CheckboxRenderer = function CheckboxRenderer(_ref) {
  var classes = _ref.classes,
      rest = _objectWithoutPropertiesLoose(_ref, ["classes"]);

  return /*#__PURE__*/React.createElement("input", _extends({}, rest, {
    type: "checkbox",
    className: classes.input
  }));
};
CheckboxRenderer.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string.isRequired).isRequired
};
export default Styled(styles)(CheckboxRenderer);