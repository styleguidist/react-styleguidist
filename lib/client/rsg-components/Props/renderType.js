import "core-js/modules/es.function.name";
import React from 'react';
import Type from 'rsg-components/Type';
import ComplexType from 'rsg-components/ComplexType';
import { getType } from './util';
export function renderType(type) {
  if (!type) {
    return 'unknown';
  }

  var name = type.name;

  switch (name) {
    case 'arrayOf':
      return type.value.name + "[]";

    case 'objectOf':
      return "{" + renderType(type.value) + "}";

    case 'instanceOf':
      return type.value;

    default:
      return name;
  }
}

function renderAdvancedType(type) {
  switch (type.name) {
    case 'enum':
      return /*#__PURE__*/React.createElement(Type, null, type.name);

    case 'literal':
      return /*#__PURE__*/React.createElement(Type, null, type.value);

    case 'signature':
      return /*#__PURE__*/React.createElement(ComplexType, {
        name: type.type,
        raw: type.raw
      });

    case 'union':
    case 'tuple':
      return /*#__PURE__*/React.createElement(ComplexType, {
        name: type.name,
        raw: type.raw
      });

    default:
      return /*#__PURE__*/React.createElement(Type, null, type.raw || type.name);
  }
}

export default function renderTypeColumn(prop) {
  var type = getType(prop);

  if (!type) {
    return null;
  }

  if (prop.flowType || prop.tsType) {
    return renderAdvancedType(type);
  }

  return /*#__PURE__*/React.createElement(Type, null, renderType(type));
}