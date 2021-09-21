import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.function.name";
import "core-js/modules/es.object.assign";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'rsg-components/Markdown';
import Argument from 'rsg-components/Argument';
import Arguments from 'rsg-components/Arguments';
import Name from 'rsg-components/Name';
import JsDoc from 'rsg-components/JsDoc';
import Table from 'rsg-components/Table';

var getRowKey = function getRowKey(row) {
  return row.name;
};

export var columns = [{
  caption: 'Method name',
  // eslint-disable-next-line react/prop-types
  render: function render(_ref) {
    var name = _ref.name,
        _ref$tags = _ref.tags,
        tags = _ref$tags === void 0 ? {} : _ref$tags;
    return /*#__PURE__*/React.createElement(Name, {
      deprecated: !!tags.deprecated
    }, name + "()");
  }
}, {
  caption: 'Parameters',
  // eslint-disable-next-line react/prop-types
  render: function render(_ref2) {
    var _ref2$params = _ref2.params,
        params = _ref2$params === void 0 ? [] : _ref2$params;
    return /*#__PURE__*/React.createElement(Arguments, {
      args: params
    });
  }
}, {
  caption: 'Description',
  // eslint-disable-next-line react/prop-types
  render: function render(_ref3) {
    var description = _ref3.description,
        returns = _ref3.returns,
        _ref3$tags = _ref3.tags,
        tags = _ref3$tags === void 0 ? {} : _ref3$tags;
    return /*#__PURE__*/React.createElement("div", null, description && /*#__PURE__*/React.createElement(Markdown, {
      text: description
    }), returns && /*#__PURE__*/React.createElement(Argument, _extends({
      block: true,
      returns: true
    }, returns)), /*#__PURE__*/React.createElement(JsDoc, tags));
  }
}];

var MethodsRenderer = function MethodsRenderer(_ref4) {
  var methods = _ref4.methods;
  return /*#__PURE__*/React.createElement(Table, {
    columns: columns,
    rows: methods,
    getRowKey: getRowKey
  });
};

MethodsRenderer.propTypes = {
  methods: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    returns: PropTypes.object,
    params: PropTypes.array,
    tags: PropTypes.object
  }).isRequired).isRequired
};
export default MethodsRenderer;