import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.array.map";
import "core-js/modules/es.function.name";
import "core-js/modules/es.object.keys";
import React from 'react';
import Group from 'react-group';
import Type from 'rsg-components/Type';
import Code from 'rsg-components/Code';
import Name from 'rsg-components/Name';
import Markdown from 'rsg-components/Markdown';
import { unquote, getType, showSpaces } from './util';
import renderDefault from './renderDefault';
import { renderType } from './renderType';

function renderEnum(type) {
  if (!Array.isArray(type.value)) {
    return /*#__PURE__*/React.createElement("span", null, type.value);
  }

  var values = type.value.map(function (_ref) {
    var value = _ref.value;
    return /*#__PURE__*/React.createElement(Code, {
      key: value
    }, showSpaces(unquote(value)));
  });
  return /*#__PURE__*/React.createElement("span", null, "One of: ", /*#__PURE__*/React.createElement(Group, {
    separator: ", "
  }, values));
}

function renderUnion(type) {
  if (!Array.isArray(type.value)) {
    return /*#__PURE__*/React.createElement("span", null, type.value);
  }

  var values = type.value.map(function (value, index) {
    return /*#__PURE__*/React.createElement(Type, {
      key: value.name + "-" + index
    }, renderType(value));
  });
  return /*#__PURE__*/React.createElement("span", null, "One of type: ", /*#__PURE__*/React.createElement(Group, {
    separator: ", "
  }, values));
}

function renderShape(props) {
  return Object.keys(props).map(function (name) {
    var prop = props[name];
    var defaultValue = renderDefault(prop);
    var description = prop.description;
    return /*#__PURE__*/React.createElement("div", {
      key: name
    }, /*#__PURE__*/React.createElement(Name, null, name), ': ', /*#__PURE__*/React.createElement(Type, null, renderType(prop)), defaultValue && ' — ', defaultValue, description && ' — ', description && /*#__PURE__*/React.createElement(Markdown, {
      text: description,
      inline: true
    }));
  });
}

export default function renderExtra(prop) {
  var type = getType(prop);

  if (!type) {
    return null;
  }

  switch (type.name) {
    case 'enum':
      return renderEnum(type);

    case 'union':
      return renderUnion(type);

    case 'shape':
      return prop.type && renderShape(prop.type.value);

    case 'exact':
      return prop.type && renderShape(prop.type.value);

    case 'arrayOf':
      if (type.value.name === 'shape' || type.value.name === 'exact') {
        return prop.type && renderShape(prop.type.value.value);
      }

      return null;

    case 'objectOf':
      if (type.value.name === 'shape' || type.value.name === 'exact') {
        return prop.type && renderShape(prop.type.value.value);
      }

      return null;

    default:
      return null;
  }
}