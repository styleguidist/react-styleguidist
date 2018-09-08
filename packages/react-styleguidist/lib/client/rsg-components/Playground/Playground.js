import "core-js/modules/es7.symbol.async-iterator";
import "core-js/modules/es6.symbol";
import "core-js/modules/es6.function.name";

import React, { Component } from 'react';
import { polyfill } from 'react-lifecycles-compat';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import Preview from 'rsg-components/Preview';
import Para from 'rsg-components/Para';
import Slot from 'rsg-components/Slot';
import PlaygroundRenderer from 'rsg-components/Playground/PlaygroundRenderer';
import { EXAMPLE_TAB_CODE_EDITOR } from '../slots';
import { DisplayModes, ExampleModes } from '../../consts';

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

const Playground =
/*#__PURE__*/
function (_Component) {
  _inherits(Playground, _Component);

  function Playground(props, context) {
    let _this;

    _classCallCheck(this, Playground);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Playground).call(this, props, context));
    const code = props.code;

        
const settings = props.settings;

        
const exampleMode = props.exampleMode;
    const config = context.config;
    const expandCode = exampleMode === ExampleModes.expand;
    const activeTab = settings.showcode !== undefined ? settings.showcode : expandCode;
    _this.state = {
      code,
      prevCode: code,
      activeTab: activeTab ? EXAMPLE_TAB_CODE_EDITOR : undefined
    };
    _this.handleTabChange = _this.handleTabChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleChange = debounce(_this.handleChange.bind(_assertThisInitialized(_assertThisInitialized(_this))), config.previewDelay);
    return _this;
  }

  _createClass(Playground, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      // Clear pending changes
      this.handleChange.cancel();
    }
  }, {
    key: "handleChange",
    value: function handleChange(code) {
      this.setState({
        code
      });
    }
  }, {
    key: "handleTabChange",
    value: function handleTabChange(name) {
      this.setState(function (state) {
        return {
          activeTab: state.activeTab !== name ? name : undefined
        };
      });
    }
  }, {
    key: "render",
    value: function render() {
      const _this$state = this.state;

          
const code = _this$state.code;

          
const activeTab = _this$state.activeTab;
      const _this$props = this.props;

          
const evalInContext = _this$props.evalInContext;

          
const index = _this$props.index;

          
const name = _this$props.name;

          
const settings = _this$props.settings;

          
const exampleMode = _this$props.exampleMode;
      const displayMode = this.context.displayMode;
      const isExampleHidden = exampleMode === ExampleModes.hide;
      const isEditorHidden = settings.noeditor || isExampleHidden;
      const preview = React.createElement(Preview, {
        code,
        evalInContext
      });
      return isEditorHidden ? React.createElement(Para, null, preview) : React.createElement(PlaygroundRenderer, {
        name,
        preview,
        previewProps: settings.props || {},
        tabButtons: React.createElement(Slot, {
          name: "exampleTabButtons",
          active: activeTab,
          props: {
            onClick: this.handleTabChange
          }
        }),
        tabBody: React.createElement(Slot, {
          name: "exampleTabs",
          active: activeTab,
          onlyActive: true // evalInContext passed through to support custom slots that eval code
          ,
          props: {
            code,
            onChange: this.handleChange,
            evalInContext
          }
        }),
        toolbar: React.createElement(Slot, {
          name: "exampleToolbar",
          props: {
            name,
            isolated: displayMode === DisplayModes.example,
            example: index
          }
        })
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

  return Playground;
}(Component);

_defineProperty(Playground, "propTypes", {
  code: PropTypes.string.isRequired,
  evalInContext: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  exampleMode: PropTypes.string.isRequired,
  settings: PropTypes.object
});

_defineProperty(Playground, "contextTypes", {
  config: PropTypes.object.isRequired,
  displayMode: PropTypes.string
});

export default polyfill(Playground);