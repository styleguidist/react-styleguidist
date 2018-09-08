import "core-js/modules/es7.symbol.async-iterator";
import "core-js/modules/es6.symbol";
import "core-js/modules/es6.regexp.to-string";

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import PlaygroundError from 'rsg-components/PlaygroundError';
import ReactExample from '../ReactExample';

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
const Fragment = React.Fragment ? React.Fragment : 'div';

const Preview =
/*#__PURE__*/
function (_Component) {
  _inherits(Preview, _Component);

  function Preview() {
    let _getPrototypeOf2;

    let _this;

    _classCallCheck(this, Preview);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Preview)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      error: null
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleError", function (err) {
      _this.unmountPreview();

      _this.setState({
        error: err.toString()
      });

      console.error(err); // eslint-disable-line no-console
    });

    return _this;
  }

  _createClass(Preview, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // Clear console after hot reload, do not clear on the first load
      // to keep any warnings
      if (this.context.codeRevision > 0) {
        // eslint-disable-next-line no-console
        console.clear();
      }

      this.executeCode();
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return this.state.error !== nextState.error || this.props.code !== nextProps.code;
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.props.code !== prevProps.code) {
        this.executeCode();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.unmountPreview();
    }
  }, {
    key: "unmountPreview",
    value: function unmountPreview() {
      if (this.mountNode) {
        ReactDOM.unmountComponentAtNode(this.mountNode);
      }
    }
  }, {
    key: "executeCode",
    value: function executeCode() {
      const _this2 = this;

      this.setState({
        error: null
      });
      const code = this.props.code;

      if (!code) {
        return;
      }

      const wrappedComponent = React.createElement(ReactExample, {
        code,
        evalInContext: this.props.evalInContext,
        onError: this.handleError,
        compilerConfig: this.context.config.compilerConfig
      });
      window.requestAnimationFrame(function () {
        _this2.unmountPreview();

        try {
          ReactDOM.render(wrappedComponent, _this2.mountNode);
        } catch (err) {
          _this2.handleError(err);
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      const _this3 = this;

      const error = this.state.error;
      return React.createElement(Fragment, null, React.createElement("div", {
        ref: function ref(_ref) {
          return _this3.mountNode = _ref;
        }
      }), error && React.createElement(PlaygroundError, {
        message: error
      }));
    }
  }]);

  return Preview;
}(Component);

_defineProperty(Preview, "propTypes", {
  code: PropTypes.string.isRequired,
  evalInContext: PropTypes.func.isRequired
});

_defineProperty(Preview, "contextTypes", {
  config: PropTypes.object.isRequired,
  codeRevision: PropTypes.number.isRequired
});

export { Preview as default };