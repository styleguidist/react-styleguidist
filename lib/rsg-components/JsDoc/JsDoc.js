'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getMarkdown = getMarkdown;
exports.default = JsDoc;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Markdown = require('rsg-components/Markdown');

var _Markdown2 = _interopRequireDefault(_Markdown);

var _map = require('lodash/map');

var _map2 = _interopRequireDefault(_map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var plural = function plural(array, caption) {
	return array.length === 1 ? caption : caption + 's';
};
var list = function list(array) {
	return array.map(function (item) {
		return item.description;
	}).join(', ');
};
var paragraphs = function paragraphs(array) {
	return array.map(function (item) {
		return item.description;
	}).join('\n\n');
};

var fields = {
	deprecated: function deprecated(value) {
		return '**Deprecated:** ' + value[0].description;
	},
	see: function see(value) {
		return paragraphs(value);
	},
	link: function link(value) {
		return paragraphs(value);
	},
	author: function author(value) {
		return plural(value, 'Author') + ': ' + list(value);
	},
	version: function version(value) {
		return 'Version: ' + value[0].description;
	},
	since: function since(value) {
		return 'Since: ' + value[0].description;
	}
};

function getMarkdown(props) {
	return (0, _map2.default)(fields, function (format, field) {
		return props[field] && format(props[field]);
	}).filter(Boolean).join('\n\n');
}

function JsDoc(props) {
	var markdown = getMarkdown(props);
	return markdown ? _react2.default.createElement(_Markdown2.default, { text: markdown }) : null;
}

JsDoc.propTypes = {
	deprecated: _propTypes2.default.array,
	see: _propTypes2.default.array,
	link: _propTypes2.default.array,
	author: _propTypes2.default.array,
	version: _propTypes2.default.array,
	since: _propTypes2.default.array
};