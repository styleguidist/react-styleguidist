import "core-js/modules/es.array.concat";
import "core-js/modules/es.object.assign";
import "core-js/modules/es.object.get-prototype-of";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.reflect.construct";
import "core-js/modules/es.regexp.to-string";
import "core-js/modules/es.string.link";
import "core-js/modules/es.string.small";

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';
import SimpleEditor from 'react-simple-code-editor';
import { highlight as prismHighlight, languages } from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import { space } from '../../styles/theme';
import prismTheme from '../../styles/prismTheme';

var highlight = function highlight(code) {
  return prismHighlight(code, languages.jsx, 'jsx');
};

var styles = function styles(_ref) {
  var fontFamily = _ref.fontFamily,
      fontSize = _ref.fontSize,
      color = _ref.color,
      borderRadius = _ref.borderRadius;
  return {
    root: Object.assign({
      fontFamily: fontFamily.monospace,
      fontSize: fontSize.small,
      background: color.codeBackground,
      borderRadius: borderRadius,
      '& textarea': {
        isolate: false,
        transition: 'all ease-in-out .1s',
        // important to override inline styles in react-simple-code-editor
        border: "1px " + color.border + " solid !important",
        borderRadius: borderRadius
      },
      '& textarea:focus': {
        isolate: false,
        outline: 0,
        borderColor: color.link + " !important",
        boxShadow: [[0, 0, 0, 2, color.focus]]
      }
    }, prismTheme({
      color: color
    }))
  };
};

export var Editor = /*#__PURE__*/function (_Component) {
  _inheritsLoose(Editor, _Component);

  var _super = _createSuper(Editor);

  function Editor() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {
      code: _this.props.code,
      prevCode: _this.props.code
    });

    _defineProperty(_assertThisInitialized(_this), "handleChange", function (code) {
      _this.setState({
        code: code
      });

      _this.props.onChange(code);
    });

    return _this;
  }

  Editor.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    var code = nextProps.code;

    if (prevState.prevCode !== code) {
      return {
        prevCode: code,
        code: code
      };
    }

    return null;
  };

  var _proto = Editor.prototype;

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    return nextState.code !== this.state.code;
  };

  _proto.render = function render() {
    return /*#__PURE__*/React.createElement(SimpleEditor, {
      className: this.props.classes.root,
      value: this.state.code,
      onValueChange: this.handleChange,
      highlight: highlight // Padding should be passed via a prop (not CSS) for a proper
      // cursor position calculation
      ,
      padding: space[2]
    });
  };

  return Editor;
}(Component);

_defineProperty(Editor, "propTypes", {
  code: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.string.isRequired).isRequired
});

export default Styled(styles)(Editor);