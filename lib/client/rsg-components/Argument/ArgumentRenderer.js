import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.array.index-of";
import "core-js/modules/es.function.name";
import "core-js/modules/es.object.keys";

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';
import Markdown from 'rsg-components/Markdown';
import Name from 'rsg-components/Name';
import Type from 'rsg-components/Type';
import Group from 'react-group';
import doctrine from 'doctrine';
export var styles = function styles(_ref) {
  var space = _ref.space;
  return {
    block: {
      marginBottom: space[2]
    }
  };
};
export var ArgumentRenderer = function ArgumentRenderer(_ref2) {
  var classes = _ref2.classes,
      name = _ref2.name,
      type = _ref2.type,
      description = _ref2.description,
      returns = _ref2.returns,
      block = _ref2.block,
      props = _objectWithoutPropertiesLoose(_ref2, ["classes", "name", "type", "description", "returns", "block"]);

  var isOptional = type && type.type === 'OptionalType';
  var defaultValue = props.default;

  if (isOptional) {
    type = type.expression;
  }

  var typeName = type ? doctrine.type.stringify(type) : '';
  var content = /*#__PURE__*/React.createElement(Group, null, returns && 'Returns', name && /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Name, null, name), type && ':'), type && /*#__PURE__*/React.createElement(Type, null, typeName, isOptional && '?', !!defaultValue && "=" + defaultValue), type && description && "\u2014", description && /*#__PURE__*/React.createElement(Markdown, {
    text: "" + description,
    inline: true
  }));

  if (block) {
    return /*#__PURE__*/React.createElement("div", {
      className: classes.block
    }, content);
  }

  return content;
};
ArgumentRenderer.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
  name: PropTypes.string,
  type: PropTypes.object,
  default: PropTypes.string,
  description: PropTypes.string,
  returns: PropTypes.bool,
  block: PropTypes.bool
};
export default Styled(styles)(ArgumentRenderer);