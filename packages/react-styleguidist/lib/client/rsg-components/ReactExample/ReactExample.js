import "core-js/modules/es7.symbol.async-iterator";
import "core-js/modules/es6.symbol";

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Wrapper from 'rsg-components/Wrapper';
import compileCode from '../../utils/compileCode';
import splitExampleCode from '../../utils/splitExampleCode';

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (let i = 0; i < props.length; i++) { const descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) {descriptor.writable = true;} Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) {_defineProperties(Constructor.prototype, protoProps);} if (staticProps) {_defineProperties(Constructor, staticProps);} return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) {_setPrototypeOf(subClass, superClass);} }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
/* eslint-disable react/no-multi-comp */
// Wrap everything in a React component to leverage the state management
// of this component

const StateHolder =
/*#__PURE__*/
function (_Component) {
  _inherits(StateHolder, _Component);

  function StateHolder() {
    let _getPrototypeOf2;

    let _this;

    _classCallCheck(this, StateHolder);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(StateHolder)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", _this.props.initialState);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "setStateBinded", _this.setState.bind(_assertThisInitialized(_assertThisInitialized(_this))));

    return _this;
  }

  _createClass(StateHolder, [{
    key: "render",
    value: function render() {
      return this.props.component(this.state, this.setStateBinded);
    }
  }]);

  return StateHolder;
}(Component);

_defineProperty(StateHolder, "propTypes", {
  component: PropTypes.func.isRequired,
  initialState: PropTypes.object.isRequired
});

const ReactExample =
/*#__PURE__*/
function (_Component2) {
  _inherits(ReactExample, _Component2);

  function ReactExample() {
    _classCallCheck(this, ReactExample);

    return _possibleConstructorReturn(this, _getPrototypeOf(ReactExample).apply(this, arguments));
  }

  _createClass(ReactExample, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      return this.props.code !== nextProps.code;
    } // Eval the code to extract the value of the initial state

  }, {
    key: "getExampleInitialState",
    value: function getExampleInitialState(compiledCode) {
      if (compiledCode.indexOf('initialState') === -1) {
        return {};
      }

      return this.props.evalInContext("\n\t\t\tvar state = {}, initialState = {};\n\t\t\ttry {\n\t\t\t\t".concat(compiledCode, ";\n\t\t\t} catch (err) {}\n\t\t\treturn initialState;\n\t\t"))();
    } // Run example code and return the last top-level expression

  }, {
    key: "getExampleComponent",
    value: function getExampleComponent(compiledCode) {
      return this.props.evalInContext("\n\t\t\tvar initialState = {};\n\t\t\t".concat(compiledCode, "\n\t\t"));
    }
  }, {
    key: "render",
    value: function render() {
      const _this$props = this.props;

          
const code = _this$props.code;

          
const compilerConfig = _this$props.compilerConfig;

          
const onError = _this$props.onError;
      const compiledCode = compileCode(code, compilerConfig, onError);

      if (!compiledCode) {
        return null;
      }

      const _splitExampleCode = splitExampleCode(compiledCode);

          
const head = _splitExampleCode.head;

          
const example = _splitExampleCode.example;

      const initialState = this.getExampleInitialState(head);
      const exampleComponent = this.getExampleComponent(example);
      const wrappedComponent = React.createElement(Wrapper, {
        onError
      }, React.createElement(StateHolder, {
        component: exampleComponent,
        initialState
      }));
      return wrappedComponent;
    }
  }]);

  return ReactExample;
}(Component);

_defineProperty(ReactExample, "propTypes", {
  code: PropTypes.string.isRequired,
  evalInContext: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  compilerConfig: PropTypes.object
});

_defineProperty(ReactExample, "contextTypes", {});

export { ReactExample as default };