import "core-js/modules/es.function.name";
import "core-js/modules/es.object.assign";
import "core-js/modules/es.object.get-prototype-of";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.reflect.construct";
import "core-js/modules/es.regexp.exec";
import "core-js/modules/es.regexp.to-string";
import "core-js/modules/es.string.replace";

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import Context from 'rsg-components/Context';
import createStyleSheet from '../../styles/createStyleSheet';
export default function StyleHOC(styles) {
  return function (WrappedComponent) {
    var _class, _temp;

    var componentName = WrappedComponent.name.replace(/Renderer$/, '');
    return _temp = _class = /*#__PURE__*/function (_Component) {
      _inheritsLoose(_class, _Component);

      var _super = _createSuper(_class);

      function _class(props, context) {
        var _this;

        _this = _Component.call(this, props, context) || this;

        _defineProperty(_assertThisInitialized(_this), "sheet", void 0);

        _this.sheet = createStyleSheet(styles, // the protection here is useful for tests
        context.config || {}, componentName, context.cssRevision);

        _this.sheet.update(props).attach();

        return _this;
      }

      var _proto = _class.prototype;

      _proto.componentDidUpdate = function componentDidUpdate(nextProps) {
        this.sheet.update(nextProps);
      };

      _proto.render = function render() {
        return /*#__PURE__*/React.createElement(WrappedComponent, Object.assign({}, this.props, {
          classes: this.sheet.classes
        }));
      };

      return _class;
    }(Component), _defineProperty(_class, "displayName", "Styled(" + componentName + ")"), _defineProperty(_class, "contextType", Context), _temp;
  };
}