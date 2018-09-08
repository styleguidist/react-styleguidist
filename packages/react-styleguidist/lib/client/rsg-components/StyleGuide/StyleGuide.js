import "core-js/modules/es7.symbol.async-iterator";
import "core-js/modules/es6.symbol";

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TableOfContents from 'rsg-components/TableOfContents';
import StyleGuideRenderer from 'rsg-components/StyleGuide/StyleGuideRenderer';
import Sections from 'rsg-components/Sections';
import Welcome from 'rsg-components/Welcome';
import Error from 'rsg-components/Error';
import NotFound from 'rsg-components/NotFound';
import { HOMEPAGE } from '../../../scripts/consts';
import { DisplayModes } from '../../consts';

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
 * @param {boolean} displayMode
 * @param {boolean} showSidebar
 * @param {boolean} pagePerSection
 * @returns {boolean}
 */

function hasSidebar(displayMode, showSidebar) {
  return displayMode === DisplayModes.notFound || showSidebar && displayMode === DisplayModes.all;
}

const StyleGuide =
/*#__PURE__*/
function (_Component) {
  _inherits(StyleGuide, _Component);

  function StyleGuide() {
    let _getPrototypeOf2;

    let _this;

    _classCallCheck(this, StyleGuide);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(StyleGuide)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      error: false,
      info: null
    });

    return _this;
  }

  _createClass(StyleGuide, [{
    key: "getChildContext",
    value: function getChildContext() {
      return {
        codeRevision: this.props.codeRevision,
        config: this.props.config,
        slots: this.props.slots,
        displayMode: this.props.displayMode
      };
    }
  }, {
    key: "componentDidCatch",
    value: function componentDidCatch(error, info) {
      this.setState({
        error,
        info
      });
    }
  }, {
    key: "render",
    value: function render() {
      const _this$props = this.props;

          
const config = _this$props.config;

          
const sections = _this$props.sections;

          
const welcomeScreen = _this$props.welcomeScreen;

          
const patterns = _this$props.patterns;

          
const displayMode = _this$props.displayMode;

          
const allSections = _this$props.allSections;

          
const pagePerSection = _this$props.pagePerSection;

      if (this.state.error) {
        return React.createElement(Error, {
          error: this.state.error,
          info: this.state.info
        });
      }

      if (welcomeScreen) {
        return React.createElement(Welcome, {
          patterns
        });
      }

      return React.createElement(StyleGuideRenderer, {
        title: config.title,
        version: config.version,
        homepageUrl: HOMEPAGE,
        toc: React.createElement(TableOfContents, {
          sections: allSections,
          useRouterLinks: pagePerSection
        }),
        hasSidebar: hasSidebar(displayMode, config.showSidebar)
      }, sections.length ? React.createElement(Sections, {
        sections,
        depth: 1
      }) : React.createElement(NotFound, null));
    }
  }]);

  return StyleGuide;
}(Component);

_defineProperty(StyleGuide, "propTypes", {
  codeRevision: PropTypes.number.isRequired,
  config: PropTypes.object.isRequired,
  slots: PropTypes.object.isRequired,
  sections: PropTypes.array.isRequired,
  welcomeScreen: PropTypes.bool,
  patterns: PropTypes.array,
  displayMode: PropTypes.string,
  allSections: PropTypes.array.isRequired,
  pagePerSection: PropTypes.bool
});

_defineProperty(StyleGuide, "childContextTypes", {
  codeRevision: PropTypes.number.isRequired,
  config: PropTypes.object.isRequired,
  slots: PropTypes.object.isRequired,
  displayMode: PropTypes.string
});

_defineProperty(StyleGuide, "defaultProps", {
  displayMode: DisplayModes.all
});

export { StyleGuide as default };