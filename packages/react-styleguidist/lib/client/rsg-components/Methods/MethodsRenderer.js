import "core-js/modules/es6.object.assign";
import "core-js/modules/es6.function.name";

import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'rsg-components/Markdown';
import Argument from 'rsg-components/Argument';
import Arguments from 'rsg-components/Arguments';
import Name from 'rsg-components/Name';
import JsDoc from 'rsg-components/JsDoc';
import Table from 'rsg-components/Table';

function _extends() { _extends = Object.assign || function (target) { for (let i = 1; i < arguments.length; i++) { const source = arguments[i]; for (const key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const getRowKey = function getRowKey(row) {
  return row.name;
};

export var columns = [{
  caption: 'Method name',
  // eslint-disable-next-line react/prop-types
  render: function render(_ref) {
    const name = _ref.name;

        
const _ref$tags = _ref.tags;

        
const tags = _ref$tags === void 0 ? {} : _ref$tags;
    return React.createElement(Name, {
      deprecated: !!tags.deprecated
    }, "".concat(name, "()"));
  }
}, {
  caption: 'Parameters',
  // eslint-disable-next-line react/prop-types
  render: function render(_ref2) {
    const _ref2$params = _ref2.params;

        
const params = _ref2$params === void 0 ? [] : _ref2$params;
    return React.createElement(Arguments, {
      args: params
    });
  }
}, {
  caption: 'Description',
  // eslint-disable-next-line react/prop-types
  render: function render(_ref3) {
    const description = _ref3.description;

        
const returns = _ref3.returns;

        
const _ref3$tags = _ref3.tags;

        
const tags = _ref3$tags === void 0 ? {} : _ref3$tags;
    return React.createElement("div", null, description && React.createElement(Markdown, {
      text: description
    }), returns && React.createElement(Argument, _extends({
      block: true,
      returns: true
    }, returns)), React.createElement(JsDoc, tags));
  }
}];
export default function MethodsRenderer(_ref4) {
  const methods = _ref4.methods;
  return React.createElement(Table, {
    columns,
    rows: methods,
    getRowKey
  });
}
MethodsRenderer.propTypes = {
  methods: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    returns: PropTypes.object,
    params: PropTypes.array,
    tags: PropTypes.object
  })).isRequired
};