import "core-js/modules/es.array.concat";
import "core-js/modules/es.object.get-prototype-of";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.reflect.construct";
import "core-js/modules/es.regexp.exec";
import "core-js/modules/es.regexp.to-string";
import "core-js/modules/es.string.replace";

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import PlaygroundError from 'rsg-components/PlaygroundError';
import ReactExample from 'rsg-components/ReactExample';
import Context from 'rsg-components/Context';

var improveErrorMessage = function improveErrorMessage(message) {
  return message.replace('Check the render method of `StateHolder`.', 'Check the code of your example in a Markdown file or in the editor below.');
};

var Preview = /*#__PURE__*/function (_Component) {
  _inheritsLoose(Preview, _Component);

  var _super = _createSuper(Preview);

  function Preview() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "mountNode", null);

    _defineProperty(_assertThisInitialized(_this), "state", {
      error: null
    });

    _defineProperty(_assertThisInitialized(_this), "handleError", function (err) {
      _this.unmountPreview();

      _this.setState({
        error: improveErrorMessage(err.toString())
      });

      console.error(err); // eslint-disable-line no-console
    });

    return _this;
  }

  var _proto = Preview.prototype;

  _proto.componentDidMount = function componentDidMount() {
    // Clear console after hot reload, do not clear on the first load
    // to keep any warnings
    if (this.context.codeRevision > 0) {
      // eslint-disable-next-line no-console
      console.clear();
    }

    this.executeCode();
  };

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    return this.state.error !== nextState.error || this.props.code !== nextProps.code;
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (this.props.code !== prevProps.code) {
      this.executeCode();
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.unmountPreview();
  };

  _proto.unmountPreview = function unmountPreview() {
    if (this.mountNode) {
      ReactDOM.unmountComponentAtNode(this.mountNode);
    }
  };

  _proto.executeCode = function executeCode() {
    var _this2 = this;

    this.setState({
      error: null
    });
    var code = this.props.code;

    if (!code) {
      return;
    }

    var wrappedComponent = /*#__PURE__*/React.createElement(ReactExample, {
      code: code,
      evalInContext: this.props.evalInContext,
      onError: this.handleError,
      compilerConfig: this.context.config.compilerConfig
    });
    window.requestAnimationFrame(function () {
      // this.unmountPreview();
      try {
        ReactDOM.render(wrappedComponent, _this2.mountNode);
      } catch (err) {
        _this2.handleError(err);
      }
    });
  };

  _proto.render = function render() {
    var _this3 = this;

    var error = this.state.error;
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      "data-testid": "mountNode",
      ref: function ref(_ref) {
        return _this3.mountNode = _ref;
      }
    }), error && /*#__PURE__*/React.createElement(PlaygroundError, {
      message: error
    }));
  };

  return Preview;
}(Component);

_defineProperty(Preview, "propTypes", {
  code: PropTypes.string.isRequired,
  evalInContext: PropTypes.func.isRequired
});

_defineProperty(Preview, "contextType", Context);

export { Preview as default };