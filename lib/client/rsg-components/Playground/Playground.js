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
import debounce from 'lodash/debounce';
import Preview from 'rsg-components/Preview';
import Para from 'rsg-components/Para';
import Slot from 'rsg-components/Slot';
import PlaygroundRenderer from 'rsg-components/Playground/PlaygroundRenderer';
import Context from 'rsg-components/Context';
import { EXAMPLE_TAB_CODE_EDITOR } from '../slots';
import { DisplayModes, ExampleModes } from '../../consts';

var Playground = /*#__PURE__*/function (_Component) {
  _inheritsLoose(Playground, _Component);

  var _super = _createSuper(Playground);

  function Playground() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "handleChange", debounce(function (code) {
      _this.setState({
        code: code
      });
    }, _this.context.config.previewDelay));

    _defineProperty(_assertThisInitialized(_this), "state", {
      code: _this.props.code,
      prevCode: _this.props.code,
      activeTab: _this.getInitialActiveTab() ? EXAMPLE_TAB_CODE_EDITOR : undefined
    });

    _defineProperty(_assertThisInitialized(_this), "handleTabChange", function (name) {
      _this.setState(function (state) {
        return {
          activeTab: state.activeTab !== name ? name : undefined
        };
      });
    });

    return _this;
  }

  Playground.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    var code = nextProps.code;

    if (prevState.prevCode !== code) {
      return {
        prevCode: code,
        code: code
      };
    }

    return null;
  };

  var _proto = Playground.prototype;

  _proto.componentWillUnmount = function componentWillUnmount() {
    // Clear pending changes
    this.handleChange.cancel();
  };

  _proto.getInitialActiveTab = function getInitialActiveTab() {
    var expandCode = this.props.exampleMode === ExampleModes.expand;
    return this.props.settings.showcode !== undefined ? this.props.settings.showcode : expandCode;
  };

  _proto.render = function render() {
    var _this$state = this.state,
        code = _this$state.code,
        activeTab = _this$state.activeTab;
    var _this$props = this.props,
        evalInContext = _this$props.evalInContext,
        index = _this$props.index,
        name = _this$props.name,
        settings = _this$props.settings,
        exampleMode = _this$props.exampleMode;
    var displayMode = this.context.displayMode;
    var isExampleHidden = exampleMode === ExampleModes.hide;
    var isEditorHidden = settings.noeditor || isExampleHidden;
    var preview = /*#__PURE__*/React.createElement(Preview, {
      code: code,
      evalInContext: evalInContext
    });
    return isEditorHidden ? /*#__PURE__*/React.createElement(Para, null, preview) : /*#__PURE__*/React.createElement(PlaygroundRenderer, {
      name: name,
      exampleIndex: index,
      padded: !!settings.padded,
      preview: preview,
      previewProps: settings.props || {},
      tabButtons: /*#__PURE__*/React.createElement(Slot, {
        name: "exampleTabButtons",
        active: activeTab,
        props: {
          onClick: this.handleTabChange
        }
      }),
      tabBody: /*#__PURE__*/React.createElement(Slot, {
        name: "exampleTabs",
        active: activeTab,
        onlyActive: true // evalInContext passed through to support custom slots that eval code
        ,
        props: {
          code: code,
          onChange: this.handleChange,
          evalInContext: evalInContext
        }
      }),
      toolbar: /*#__PURE__*/React.createElement(Slot, {
        name: "exampleToolbar",
        props: {
          name: name,
          isolated: displayMode === DisplayModes.example,
          example: index
        }
      })
    });
  };

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

_defineProperty(Playground, "defaultProps", {
  settings: {}
});

_defineProperty(Playground, "contextType", Context);

export default Playground;