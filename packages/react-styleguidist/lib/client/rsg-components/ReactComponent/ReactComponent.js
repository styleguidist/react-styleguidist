import "core-js/modules/es7.symbol.async-iterator";
import "core-js/modules/es6.symbol";
import "core-js/modules/web.dom.iterable";
import "core-js/modules/es6.array.iterator";
import "core-js/modules/es6.object.keys";
import "core-js/modules/es6.function.name";

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Examples from 'rsg-components/Examples';
import SectionHeading from 'rsg-components/SectionHeading';
import JsDoc from 'rsg-components/JsDoc';
import Markdown from 'rsg-components/Markdown';
import Slot from 'rsg-components/Slot';
import ReactComponentRenderer from 'rsg-components/ReactComponent/ReactComponentRenderer';
import { DOCS_TAB_USAGE } from '../slots';
import { DisplayModes, UsageModes } from '../../consts';

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (let i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; let ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (let i = 0; i < props.length; i++) { const descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) {descriptor.writable = true;} Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) {_defineProperties(Constructor.prototype, protoProps);} if (staticProps) {_defineProperties(Constructor, staticProps);} return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) {_setPrototypeOf(subClass, superClass);} }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
const ExamplePlaceholder = process.env.STYLEGUIDIST_ENV !== 'production' ? require('rsg-components/ExamplePlaceholder').default : function () {
  return React.createElement("div", null);
};

const ReactComponent =
/*#__PURE__*/
function (_Component) {
  _inherits(ReactComponent, _Component);

  function ReactComponent(props, context) {
    let _this;

    _classCallCheck(this, ReactComponent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ReactComponent).call(this, props, context));
    const usageMode = props.usageMode;
    _this.handleTabChange = _this.handleTabChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.state = {
      activeTab: usageMode === UsageModes.expand ? DOCS_TAB_USAGE : undefined
    };
    return _this;
  }

  _createClass(ReactComponent, [{
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
      const activeTab = this.state.activeTab;
      const _this$context = this.context;

          
const displayMode = _this$context.displayMode;

          
const pagePerSection = _this$context.config.pagePerSection;
      const _this$props = this.props;

          
const component = _this$props.component;

          
const depth = _this$props.depth;

          
const usageMode = _this$props.usageMode;

          
const exampleMode = _this$props.exampleMode;
      const name = component.name;

          
const visibleName = component.visibleName;

          
const slug = component.slug;

          
const filepath = component.filepath;

          
const pathLine = component.pathLine;
      const _component$props = component.props;

          
const description = _component$props.description;

          
const _component$props$exam = _component$props.examples;

          
const examples = _component$props$exam === void 0 ? [] : _component$props$exam;

          
const _component$props$tags = _component$props.tags;

          
const tags = _component$props$tags === void 0 ? {} : _component$props$tags;

      if (!name) {
        return null;
      }

      const showUsage = usageMode !== UsageModes.hide;
      return React.createElement(ReactComponentRenderer, {
        name,
        slug,
        filepath,
        pathLine,
        docs: React.createElement(JsDoc, tags),
        description: description && React.createElement(Markdown, {
          text: description
        }),
        heading: React.createElement(SectionHeading, {
          id: slug,
          pagePerSection,
          deprecated: !!tags.deprecated,
          slotName: "componentToolbar",
          slotProps: _objectSpread({}, component, {
            isolated: displayMode !== DisplayModes.all
          }),
          depth
        }, visibleName),
        examples: examples.length > 0 ? React.createElement(Examples, {
          examples,
          name,
          exampleMode
        }) : React.createElement(ExamplePlaceholder, {
          name
        }),
        tabButtons: showUsage && React.createElement(Slot, {
          name: "docsTabButtons",
          active: activeTab,
          props: _objectSpread({}, component, {
            onClick: this.handleTabChange
          })
        }),
        tabBody: React.createElement(Slot, {
          name: "docsTabs",
          active: activeTab,
          onlyActive: true,
          props: component
        })
      });
    }
  }]);

  return ReactComponent;
}(Component);

_defineProperty(ReactComponent, "propTypes", {
  component: PropTypes.object.isRequired,
  depth: PropTypes.number.isRequired,
  exampleMode: PropTypes.string.isRequired,
  usageMode: PropTypes.string.isRequired
});

_defineProperty(ReactComponent, "contextTypes", {
  config: PropTypes.object.isRequired,
  displayMode: PropTypes.string
});

export { ReactComponent as default };