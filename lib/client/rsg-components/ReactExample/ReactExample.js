import "core-js/modules/es.object.get-prototype-of";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.reflect.construct";
import "core-js/modules/es.regexp.to-string";

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Wrapper from 'rsg-components/Wrapper';
import compileCode from '../../utils/compileCode';
import splitExampleCode from '../../utils/splitExampleCode';
/* eslint-disable react/no-multi-comp */

var ReactExample = /*#__PURE__*/function (_Component) {
  _inheritsLoose(ReactExample, _Component);

  var _super = _createSuper(ReactExample);

  function ReactExample() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = ReactExample.prototype;

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    return this.props.code !== nextProps.code;
  } // Run example code and return the last top-level expression
  ;

  _proto.getExampleComponent = function getExampleComponent(compiledCode) {
    return this.props.evalInContext("\n\t\t\t" + compiledCode + "\n\t\t");
  };

  _proto.render = function render() {
    var _this$props = this.props,
        code = _this$props.code,
        _this$props$compilerC = _this$props.compilerConfig,
        compilerConfig = _this$props$compilerC === void 0 ? {} : _this$props$compilerC,
        onError = _this$props.onError;
    var compiledCode = compileCode(code, compilerConfig, onError);

    if (!compiledCode) {
      return null;
    }

    var _splitExampleCode = splitExampleCode(compiledCode),
        example = _splitExampleCode.example;

    var ExampleComponent = this.getExampleComponent(example);
    var wrappedComponent = /*#__PURE__*/React.createElement(Wrapper, {
      onError: onError
    }, /*#__PURE__*/React.createElement(ExampleComponent, null));
    return wrappedComponent;
  };

  return ReactExample;
}(Component);

_defineProperty(ReactExample, "propTypes", {
  code: PropTypes.string.isRequired,
  evalInContext: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  compilerConfig: PropTypes.object
});

export { ReactExample as default };