import "core-js/modules/es.array.concat";
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
import TableOfContents from 'rsg-components/TableOfContents';
import StyleGuideRenderer from 'rsg-components/StyleGuide/StyleGuideRenderer';
import Sections from 'rsg-components/Sections';
import Welcome from 'rsg-components/Welcome';
import Error from 'rsg-components/Error';
import NotFound from 'rsg-components/NotFound';
import Context from 'rsg-components/Context';
import { HOMEPAGE } from '../../../scripts/consts';
import { DisplayModes } from '../../consts';

/**
 * This function will return true, if the sidebar should be visible and false otherwise.
 *
 * These sorted conditions (highest precedence first) define the visibility
 * state of the sidebar.
 *
 * - Sidebar is hidden for isolated example views
 * - Sidebar is always visible when pagePerSection
 * - Sidebar is hidden when showSidebar is set to false
 * - Sidebar is visible when showSidebar is set to true for non-isolated views
 *
 * @param {string} displayMode
 * @param {boolean} showSidebar
 * @param {boolean} pagePerSection
 * @returns {boolean}
 */
function hasSidebar(displayMode, showSidebar) {
  return displayMode === DisplayModes.notFound || showSidebar && displayMode === DisplayModes.all;
}

var StyleGuide = /*#__PURE__*/function (_Component) {
  _inheritsLoose(StyleGuide, _Component);

  var _super = _createSuper(StyleGuide);

  function StyleGuide() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {
      error: false,
      info: null
    });

    return _this;
  }

  var _proto = StyleGuide.prototype;

  _proto.componentDidCatch = function componentDidCatch(error, info) {
    this.setState({
      error: error,
      info: info
    });
  };

  _proto.render = function render() {
    var _this$state = this.state,
        error = _this$state.error,
        info = _this$state.info;
    var _this$props = this.props,
        config = _this$props.config,
        sections = _this$props.sections,
        welcomeScreen = _this$props.welcomeScreen,
        patterns = _this$props.patterns,
        displayMode = _this$props.displayMode,
        allSections = _this$props.allSections,
        pagePerSection = _this$props.pagePerSection,
        codeRevision = _this$props.codeRevision,
        cssRevision = _this$props.cssRevision,
        slots = _this$props.slots;

    if (error && info) {
      return /*#__PURE__*/React.createElement(Error, {
        error: error,
        info: info
      });
    }

    if (welcomeScreen && patterns) {
      return /*#__PURE__*/React.createElement(Welcome, {
        patterns: patterns
      });
    }

    return /*#__PURE__*/React.createElement(Context.Provider, {
      value: {
        codeRevision: codeRevision,
        config: config,
        slots: slots,
        displayMode: displayMode || DisplayModes.all,
        cssRevision: cssRevision
      }
    }, /*#__PURE__*/React.createElement(StyleGuideRenderer, {
      key: cssRevision,
      title: config.title,
      version: config.version,
      homepageUrl: HOMEPAGE,
      toc: allSections ? /*#__PURE__*/React.createElement(TableOfContents, {
        sections: allSections,
        useRouterLinks: pagePerSection,
        tocMode: config.tocMode
      }) : null,
      hasSidebar: hasSidebar(displayMode, config.showSidebar)
    }, sections.length ? /*#__PURE__*/React.createElement(Sections, {
      sections: sections,
      depth: 1
    }) : /*#__PURE__*/React.createElement(NotFound, null)));
  };

  return StyleGuide;
}(Component);

_defineProperty(StyleGuide, "propTypes", {
  codeRevision: PropTypes.number.isRequired,
  cssRevision: PropTypes.string.isRequired,
  config: PropTypes.object.isRequired,
  slots: PropTypes.object.isRequired,
  sections: PropTypes.array.isRequired,
  welcomeScreen: PropTypes.bool,
  patterns: PropTypes.array,
  displayMode: PropTypes.string,
  allSections: PropTypes.array.isRequired,
  pagePerSection: PropTypes.bool
});

_defineProperty(StyleGuide, "defaultProps", {
  displayMode: DisplayModes.all
});

export { StyleGuide as default };