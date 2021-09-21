import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.array.concat";
import "core-js/modules/es.function.name";
import "core-js/modules/es.object.assign";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import PropTypes from 'prop-types';
import Arguments from 'rsg-components/Arguments';
import Argument from 'rsg-components/Argument';
import JsDoc from 'rsg-components/JsDoc';
import Markdown from 'rsg-components/Markdown';
import Name from 'rsg-components/Name';
import Para from 'rsg-components/Para';
import Table from 'rsg-components/Table';
import renderTypeColumn from './renderType';
import renderExtra from './renderExtra';
import renderDefault from './renderDefault';

function renderDescription(prop) {
  var description = prop.description,
      _prop$tags = prop.tags,
      tags = _prop$tags === void 0 ? {} : _prop$tags;
  var extra = renderExtra(prop);
  var args = [].concat(tags.arg || [], tags.argument || [], tags.param || []);
  var returnDocumentation = tags.return && tags.return[0] || tags.returns && tags.returns[0];
  return /*#__PURE__*/React.createElement("div", null, description && /*#__PURE__*/React.createElement(Markdown, {
    text: description
  }), extra && /*#__PURE__*/React.createElement(Para, null, extra), /*#__PURE__*/React.createElement(JsDoc, tags), args.length > 0 && /*#__PURE__*/React.createElement(Arguments, {
    args: args,
    heading: true
  }), returnDocumentation && /*#__PURE__*/React.createElement(Argument, _extends({}, Object.assign({}, returnDocumentation, {
    name: ''
  }), {
    returns: true
  })));
}

function renderName(prop) {
  var name = prop.name,
      _prop$tags2 = prop.tags,
      tags = _prop$tags2 === void 0 ? {} : _prop$tags2;
  return /*#__PURE__*/React.createElement(Name, {
    deprecated: !!tags.deprecated
  }, name);
}

export function getRowKey(row) {
  return row.name;
}
export var columns = [{
  caption: 'Prop name',
  render: renderName
}, {
  caption: 'Type',
  render: renderTypeColumn
}, {
  caption: 'Default',
  render: renderDefault
}, {
  caption: 'Description',
  render: renderDescription
}];

var PropsRenderer = function PropsRenderer(_ref) {
  var props = _ref.props;
  return /*#__PURE__*/React.createElement(Table, {
    columns: columns,
    rows: props,
    getRowKey: getRowKey
  });
};

PropsRenderer.propTypes = {
  props: PropTypes.array.isRequired
};
export default PropsRenderer;