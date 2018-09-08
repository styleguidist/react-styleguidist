import "core-js/modules/web.dom.iterable";
import "core-js/modules/es6.array.iterator";
import "core-js/modules/es6.object.keys";

import { create } from 'jss';
import global from 'jss-global';
import isolate from 'jss-isolate';
import nested from 'jss-nested';
import camelCase from 'jss-camel-case';
import defaultUnit from 'jss-default-unit';
import compose from 'jss-compose';
import nonInheritedProps from './nonInheritedProps';

function _objectSpread(target) { for (let i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; let ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const createGenerateClassName = function createGenerateClassName() {
  let counter = 0;
  return function (rule) {
    return "rsg--".concat(rule.key, "-").concat(counter++);
  };
};

const jss = create({
  createGenerateClassName,
  plugins: [global(), isolate({
    reset: _objectSpread({}, nonInheritedProps, {
      // “Global” styles for all components
      boxSizing: 'border-box',
      // Allow inheritance because it may be set on body and should be available for user components
      color: 'inherit',
      font: 'inherit',
      fontFamily: 'inherit',
      fontSize: 'inherit',
      fontWeight: 'inherit',
      lineHeight: 'inherit'
    })
  }), nested(), camelCase(), defaultUnit(), compose()]
});
export default jss;