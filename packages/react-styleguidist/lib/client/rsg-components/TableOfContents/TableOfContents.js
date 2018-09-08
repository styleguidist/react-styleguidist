import "core-js/modules/es6.array.from";
import "core-js/modules/es6.regexp.to-string";
import "core-js/modules/es7.symbol.async-iterator";
import "core-js/modules/es6.symbol";
import "core-js/modules/web.dom.iterable";
import "core-js/modules/es6.object.assign";
import "core-js/modules/es6.function.name";

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ComponentsList from 'rsg-components/ComponentsList';
import TableOfContentsRenderer from 'rsg-components/TableOfContents/TableOfContentsRenderer';
import filterSectionsByName from '../../utils/filterSectionsByName';

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") {return Array.from(iter);} }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (let i = 0; i < props.length; i++) { const descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) {descriptor.writable = true;} Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) {_defineProperties(Constructor.prototype, protoProps);} if (staticProps) {_defineProperties(Constructor, staticProps);} return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) {_setPrototypeOf(subClass, superClass);} }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const TableOfContents =
/*#__PURE__*/
function (_Component) {
  _inherits(TableOfContents, _Component);

  function TableOfContents() {
    let _getPrototypeOf2;

    let _this;

    _classCallCheck(this, TableOfContents);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(TableOfContents)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      searchTerm: ''
    });

    return _this;
  }

  _createClass(TableOfContents, [{
    key: "renderLevel",
    value: function renderLevel(sections) {
      const _this2 = this;

      const useRouterLinks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      const hashPath = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      const useHashId = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      const items = sections.map(function (section) {
        const children = _toConsumableArray(section.sections || []).concat(_toConsumableArray(section.components || []));

        const sectionDepth = section.sectionDepth || 0;
        const childHashPath = sectionDepth === 0 && useHashId ? hashPath : _toConsumableArray(hashPath).concat([section.name]);
        return Object.assign({}, section, {
          heading: !!section.name && children.length > 0,
          content: children.length > 0 && _this2.renderLevel(children, useRouterLinks, childHashPath, sectionDepth === 0)
        });
      });
      return React.createElement(ComponentsList, {
        items,
        hashPath,
        useHashId,
        useRouterLinks
      });
    }
  }, {
    key: "renderSections",
    value: function renderSections() {
      const searchTerm = this.state.searchTerm;
      const _this$props = this.props;

          
const sections = _this$props.sections;

          
const useRouterLinks = _this$props.useRouterLinks; // If there is only one section, we treat it as a root section
      // In this case the name of the section won't be rendered and it won't get left padding

      const firstLevel = sections.length === 1 ? sections[0].components : sections;
      const filtered = filterSectionsByName(firstLevel, searchTerm);
      return this.renderLevel(filtered, useRouterLinks);
    }
  }, {
    key: "render",
    value: function render() {
      const _this3 = this;

      const searchTerm = this.state.searchTerm;
      return React.createElement(TableOfContentsRenderer, {
        searchTerm,
        onSearchTermChange: function onSearchTermChange(searchTerm) {
          return _this3.setState({
            searchTerm
          });
        }
      }, this.renderSections());
    }
  }]);

  return TableOfContents;
}(Component);

_defineProperty(TableOfContents, "propTypes", {
  sections: PropTypes.array.isRequired,
  useRouterLinks: PropTypes.bool
});

export { TableOfContents as default };