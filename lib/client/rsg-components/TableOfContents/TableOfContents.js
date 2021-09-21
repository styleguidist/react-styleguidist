import "core-js/modules/es.array.concat";
import "core-js/modules/es.array.map";
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
import ComponentsList from 'rsg-components/ComponentsList';
import TableOfContentsRenderer from 'rsg-components/TableOfContents/TableOfContentsRenderer';
import filterSectionsByName from '../../utils/filterSectionsByName';
import { getHash } from '../../utils/handleHash';

var TableOfContents = /*#__PURE__*/function (_Component) {
  _inheritsLoose(TableOfContents, _Component);

  var _super = _createSuper(TableOfContents);

  function TableOfContents() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {
      searchTerm: ''
    });

    return _this;
  }

  var _proto = TableOfContents.prototype;

  _proto.renderLevel = function renderLevel(sections, useRouterLinks, hashPath, useHashId) {
    var _this2 = this;

    if (useRouterLinks === void 0) {
      useRouterLinks = false;
    }

    if (hashPath === void 0) {
      hashPath = [];
    }

    if (useHashId === void 0) {
      useHashId = false;
    }

    // Match selected component in both basic routing and pagePerSection routing.
    var _this$props$loc = this.props.loc,
        hash = _this$props$loc.hash,
        pathname = _this$props$loc.pathname;
    var windowHash = pathname + (useRouterLinks ? hash : getHash(hash));
    var childrenContainSelected = false;
    var processedItems = sections.map(function (section) {
      var children = [].concat(section.sections || [], section.components || []);
      var sectionDepth = section.sectionDepth || 0;
      var childHashPath = sectionDepth === 0 && useHashId ? hashPath : [].concat(hashPath, [section.name ? section.name : '-']);

      var _ref = children.length > 0 ? _this2.renderLevel(children, useRouterLinks, childHashPath, sectionDepth === 0) : {
        content: undefined,
        containsSelected: false
      },
          content = _ref.content,
          containsSelected = _ref.containsSelected;

      var selected = (!useRouterLinks && section.href ? getHash(section.href) : section.href) === windowHash;

      if (containsSelected || selected) {
        childrenContainSelected = true;
      }

      return Object.assign({}, section, {
        heading: !!section.name && children.length > 0,
        content: content,
        selected: selected,
        shouldOpenInNewTab: !!section.external && !!section.externalLink,
        initialOpen: _this2.props.tocMode !== 'collapse' || containsSelected || section.expand,
        forcedOpen: !!_this2.state.searchTerm.length
      });
    });
    return {
      content: /*#__PURE__*/React.createElement(ComponentsList, {
        items: processedItems
      }),
      containsSelected: childrenContainSelected
    };
  };

  _proto.renderSections = function renderSections() {
    var searchTerm = this.state.searchTerm;
    var _this$props = this.props,
        sections = _this$props.sections,
        useRouterLinks = _this$props.useRouterLinks; // If there is only one section, we treat it as a root section
    // In this case the name of the section won't be rendered and it won't get left padding
    // Since a section can contain only other sections,
    // we need to make sure not to loose the subsections.
    // We will treat those subsections as the new roots.

    var firstLevel = sections.length === 1 ? // only use subsections if there actually are subsections
    sections[0].sections && sections[0].sections.length ? sections[0].sections : sections[0].components : sections;
    var filtered = firstLevel ? filterSectionsByName(firstLevel, searchTerm) : firstLevel || [];
    return this.renderLevel(filtered, useRouterLinks).content;
  };

  _proto.render = function render() {
    var _this3 = this;

    var handleSearchTermChange = function handleSearchTermChange(searchTerm) {
      return _this3.setState({
        searchTerm: searchTerm
      });
    };

    return /*#__PURE__*/React.createElement(TableOfContentsRenderer, {
      searchTerm: this.state.searchTerm,
      onSearchTermChange: handleSearchTermChange
    }, this.renderSections());
  };

  return TableOfContents;
}(Component);

_defineProperty(TableOfContents, "propTypes", {
  sections: PropTypes.array.isRequired,
  useRouterLinks: PropTypes.bool,
  tocMode: PropTypes.string,
  loc: PropTypes.object
});

_defineProperty(TableOfContents, "defaultProps", {
  loc: window.location
});

export { TableOfContents as default };