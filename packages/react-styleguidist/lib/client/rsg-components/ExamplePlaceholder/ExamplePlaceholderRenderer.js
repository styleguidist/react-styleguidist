import "core-js/modules/es7.symbol.async-iterator";
import "core-js/modules/es6.symbol";
import "core-js/modules/es6.function.name";

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';
import Markdown from 'rsg-components/Markdown';
import { DOCS_DOCUMENTING } from '../../../scripts/consts';

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

const styles = function styles(_ref) {
  const fontFamily = _ref.fontFamily;

      
const fontSize = _ref.fontSize;

      
const color = _ref.color;
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

export var ExamplePlaceholderRenderer =
/*#__PURE__*/
function (_Component) {
  _inherits(ExamplePlaceholderRenderer, _Component);

  function ExamplePlaceholderRenderer() {
    let _this;

    _classCallCheck(this, ExamplePlaceholderRenderer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ExamplePlaceholderRenderer).call(this));
    _this.handleOpen = _this.handleOpen.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.state = {
      isVisible: false
    };
    return _this;
  }

  _createClass(ExamplePlaceholderRenderer, [{
    key: "handleOpen",
    value: function handleOpen() {
      this.setState({
        isVisible: true
      });
    }
  }, {
    key: "render",
    value: function render() {
      const _this$props = this.props;

          
const classes = _this$props.classes;

          
const name = _this$props.name;
      const isVisible = this.state.isVisible;

      if (isVisible) {
        return React.createElement(Markdown, {
          text: "\nCreate **Readme.md** or **".concat(name, ".md** file in the component\u2019s folder like this:\n\n    ").concat(name, " example:\n\n    ```js\n    <").concat(name, " pizza=\"\uD83C\uDF55\" />\n\t```\n\nYou may need to **restart** the style guide server after adding an example file.\n\nRead more in the [documenting components guide](").concat(DOCS_DOCUMENTING, ").\n\t\t\t\t\t")
        });
      }

      return React.createElement("button", {
        className: classes.button,
        onClick: this.handleOpen
      }, "Add examples to this component");
    }
  }]);

  return ExamplePlaceholderRenderer;
}(Component);

_defineProperty(ExamplePlaceholderRenderer, "propTypes", {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string
});

export default Styled(styles)(ExamplePlaceholderRenderer);