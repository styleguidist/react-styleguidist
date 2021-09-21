import "core-js/modules/es.array.concat";
import "core-js/modules/es.function.name";
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
import Styled from 'rsg-components/Styled';
import Markdown from 'rsg-components/Markdown';
import { DOCS_DOCUMENTING } from '../../../scripts/consts';

var styles = function styles(_ref) {
  var fontFamily = _ref.fontFamily,
      fontSize = _ref.fontSize,
      color = _ref.color;
  return {
    button: {
      padding: 0,
      fontSize: fontSize.base,
      fontFamily: fontFamily.base,
      textDecoration: 'underline',
      color: color.light,
      border: 0,
      cursor: 'pointer',
      background: 'transparent',
      '&:hover, &:active': {
        isolate: false,
        color: color.lightest
      }
    }
  };
};

export var ExamplePlaceholderRenderer = /*#__PURE__*/function (_Component) {
  _inheritsLoose(ExamplePlaceholderRenderer, _Component);

  var _super = _createSuper(ExamplePlaceholderRenderer);

  function ExamplePlaceholderRenderer() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {
      isVisible: false
    });

    _defineProperty(_assertThisInitialized(_this), "handleOpen", function () {
      _this.setState({
        isVisible: true
      });
    });

    return _this;
  }

  var _proto = ExamplePlaceholderRenderer.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        classes = _this$props.classes,
        name = _this$props.name;
    var isVisible = this.state.isVisible;

    if (isVisible) {
      return /*#__PURE__*/React.createElement(Markdown, {
        text: "\nCreate **Readme.md** or **" + name + ".md** file in the component\u2019s folder like this:\n\n    " + name + " example:\n\n    ```js\n    <" + name + " pizza=\"\uD83C\uDF55\" />\n\t```\n\nYou may need to **restart** the style guide server after adding an example file.\n\nRead more in the [documenting components guide](" + DOCS_DOCUMENTING + ").\n\t\t\t\t\t"
      });
    }

    return /*#__PURE__*/React.createElement("button", {
      className: classes.button,
      onClick: this.handleOpen
    }, "Add examples to this component");
  };

  return ExamplePlaceholderRenderer;
}(Component);

_defineProperty(ExamplePlaceholderRenderer, "propTypes", {
  classes: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
  name: PropTypes.string
});

export default Styled(styles)(ExamplePlaceholderRenderer);