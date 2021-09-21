import "core-js/modules/es.array.index-of";
import "core-js/modules/es.function.name";
import React from 'react';
import Text from 'rsg-components/Text';
import Code from 'rsg-components/Code';
import { showSpaces, unquote } from './util';
var defaultValueBlacklist = ['null', 'undefined'];
export default function renderDefault(prop) {
  // Workaround for issue https://github.com/reactjs/react-docgen/issues/221
  // If prop has defaultValue it can not be required
  if (prop.defaultValue) {
    var defaultValueString = showSpaces(unquote(String(prop.defaultValue.value)));

    if (prop.type || prop.flowType || prop.tsType) {
      var propName = prop.type ? prop.type.name : prop.flowType ? prop.flowType.type : prop.tsType && prop.tsType.type;

      if (defaultValueBlacklist.indexOf(prop.defaultValue.value) > -1) {
        return /*#__PURE__*/React.createElement(Code, null, defaultValueString);
      } else if (propName === 'func' || propName === 'function') {
        return /*#__PURE__*/React.createElement(Text, {
          size: "small",
          color: "light",
          underlined: true,
          title: defaultValueString
        }, "Function");
      } else if (propName === 'shape' || propName === 'object') {
        try {
          // We eval source code to be able to format the defaultProp here. This
          // can be considered safe, as it is the source code that is evaled,
          // which is from a known source and safe by default
          // eslint-disable-next-line no-eval
          var object = eval("(" + prop.defaultValue.value + ")");
          return /*#__PURE__*/React.createElement(Text, {
            size: "small",
            color: "light",
            underlined: true,
            title: JSON.stringify(object, null, 2)
          }, "Shape");
        } catch (e) {
          // eval will throw if it contains a reference to a property not in the
          // local scope. To avoid any breakage we fall back to rendering the
          // prop without any formatting
          return /*#__PURE__*/React.createElement(Text, {
            size: "small",
            color: "light",
            underlined: true,
            title: prop.defaultValue.value
          }, "Shape");
        }
      }
    }

    return /*#__PURE__*/React.createElement(Code, null, defaultValueString);
  } else if (prop.required) {
    return /*#__PURE__*/React.createElement(Text, {
      size: "small",
      color: "light"
    }, "Required");
  }

  return '';
}