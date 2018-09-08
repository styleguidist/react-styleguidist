import "core-js/modules/es7.symbol.async-iterator";
import "core-js/modules/es6.symbol";
import "core-js/modules/web.dom.iterable";
import "core-js/modules/es6.array.iterator";
import "core-js/modules/es6.object.keys";
import "core-js/modules/es6.string.link";
import "core-js/modules/es6.string.small";

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';
import { polyfill } from 'react-lifecycles-compat';
import SimpleEditor from 'react-simple-code-editor';
import Prism from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import { space } from '../../styles/theme';
import prismTheme from '../../styles/prismTheme';

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (let i = 0; i < props.length; i++) { const descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) {descriptor.writable = true;} Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) {_defineProperties(Constructor.prototype, protoProps);} if (staticProps) {_defineProperties(Constructor, staticProps);} return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) {_setPrototypeOf(subClass, superClass);} }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _objectSpread(target) { for (let i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; let ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const highlight = function highlight(code) {
  return Prism.highlight(code, Prism.languages.jsx, 'jsx');
};

const styles = function styles(_ref) {
  const fontFamily = _ref.fontFamily;

      
const fontSize = _ref.fontSize;

      
const color = _ref.color;

      
const borderRadius = _ref.borderRadius;
  return {
    root: _objectSpread({
      fontFamily: fontFamily.monospace,
      fontSize: fontSize.small,
      background: color.codeBackground,
      borderRadius,
      '& textarea': {
        isolate: false,
        transition: 'all ease-in-out .1s',
        // important to override inline styles in react-simple-code-editor
        border: "1px ".concat(color.border, " solid !important"),
        borderRadius
      },
      '& textarea:focus': {
        isolate: false,
        outline: 0,
        borderColor: "".concat(color.link, " !important"),
        boxShadow: [[0, 0, 0, 2, color.focus]]
      }
    }, prismTheme({
      color
    }))
  };
};

export var Editor =
/*#__PURE__*/
function (_Component) {
  _inherits(Editor, _Component);

  function Editor() {
    let _getPrototypeOf2;

    let _this;

    _classCallCheck(this, Editor);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Editor)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      code: _this.props.code,
      prevCode: _this.props.code
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleChange", function (code) {
      _this.setState({
        code
      });

      _this.props.onChange(code);
    });

    return _this;
  }

  _createClass(Editor, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return nextState.code !== this.state.code;
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(SimpleEditor, {
        className: this.props.classes.root,
        value: this.state.code,
        onValueChange: this.handleChange,
        highlight // Padding should be passed via a prop (not CSS) for a proper
        // cursor position calculation
        ,
        padding: space[2]
      });
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      const code = nextProps.code;

      if (prevState.prevCode !== code) {
        return {
          prevCode: code,
          code
        };
      }

      return null;
    }
  }]);

  return Editor;
}(Component);

_defineProperty(Editor, "propTypes", {
  code: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
});

export default Styled(styles)(polyfill(Editor));