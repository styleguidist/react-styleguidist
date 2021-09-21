import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.array.concat";
import "core-js/modules/es.function.name";
import "core-js/modules/es.object.assign";
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
import Examples from 'rsg-components/Examples';
import SectionHeading from 'rsg-components/SectionHeading';
import JsDoc from 'rsg-components/JsDoc';
import Markdown from 'rsg-components/Markdown';
import Slot from 'rsg-components/Slot';
import ReactComponentRenderer from 'rsg-components/ReactComponent/ReactComponentRenderer';
import Context from 'rsg-components/Context';
import ExamplePlaceholderDefault from 'rsg-components/ExamplePlaceholder';
import { DOCS_TAB_USAGE } from '../slots';
import { DisplayModes, UsageModes } from '../../consts';
var ExamplePlaceholder = process.env.STYLEGUIDIST_ENV !== 'production' ? ExamplePlaceholderDefault : function () {
  return /*#__PURE__*/React.createElement("div", null);
};

var ReactComponent = /*#__PURE__*/function (_Component) {
  _inheritsLoose(ReactComponent, _Component);

  var _super = _createSuper(ReactComponent);

  function ReactComponent() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {
      activeTab: _this.props.usageMode === UsageModes.expand ? DOCS_TAB_USAGE : undefined
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

  var _proto = ReactComponent.prototype;

  _proto.render = function render() {
    var activeTab = this.state.activeTab;
    var _this$context = this.context,
        displayMode = _this$context.displayMode,
        pagePerSection = _this$context.config.pagePerSection;
    var _this$props = this.props,
        component = _this$props.component,
        depth = _this$props.depth,
        usageMode = _this$props.usageMode,
        exampleMode = _this$props.exampleMode;
    var name = component.name,
        visibleName = component.visibleName,
        _component$slug = component.slug,
        slug = _component$slug === void 0 ? '-' : _component$slug,
        filepath = component.filepath,
        pathLine = component.pathLine,
        href = component.href;

    var _ref = component.props || {},
        _ref$description = _ref.description,
        description = _ref$description === void 0 ? '' : _ref$description,
        _ref$examples = _ref.examples,
        examples = _ref$examples === void 0 ? [] : _ref$examples,
        _ref$tags = _ref.tags,
        tags = _ref$tags === void 0 ? {} : _ref$tags;

    if (!name) {
      return null;
    }

    var showUsage = usageMode !== UsageModes.hide;
    return /*#__PURE__*/React.createElement(ReactComponentRenderer, {
      name: name,
      slug: slug,
      filepath: filepath,
      pathLine: pathLine,
      docs: /*#__PURE__*/React.createElement(JsDoc, tags),
      description: description && /*#__PURE__*/React.createElement(Markdown, {
        text: description
      }),
      heading: /*#__PURE__*/React.createElement(SectionHeading, {
        id: slug,
        pagePerSection: pagePerSection,
        deprecated: !!tags.deprecated,
        slotName: "componentToolbar",
        slotProps: Object.assign({}, component, {
          isolated: displayMode !== DisplayModes.all
        }),
        href: href,
        depth: depth
      }, visibleName),
      examples: examples.length > 0 ? /*#__PURE__*/React.createElement(Examples, {
        examples: examples,
        name: name,
        exampleMode: exampleMode
      }) : /*#__PURE__*/React.createElement(ExamplePlaceholder, {
        name: name
      }),
      tabButtons: showUsage && /*#__PURE__*/React.createElement(Slot, {
        name: "docsTabButtons",
        active: activeTab,
        props: Object.assign({}, component, {
          onClick: this.handleTabChange
        })
      }),
      tabBody: /*#__PURE__*/React.createElement(Slot, {
        name: "docsTabs",
        active: activeTab,
        onlyActive: true,
        props: component
      })
    });
  };

  return ReactComponent;
}(Component);

_defineProperty(ReactComponent, "propTypes", {
  component: PropTypes.object.isRequired,
  depth: PropTypes.number.isRequired,
  exampleMode: PropTypes.string.isRequired,
  usageMode: PropTypes.string.isRequired
});

_defineProperty(ReactComponent, "contextType", Context);

export { ReactComponent as default };