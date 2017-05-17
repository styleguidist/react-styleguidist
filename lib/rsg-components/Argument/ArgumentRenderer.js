'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.styles = undefined;
exports.ArgumentRenderer = ArgumentRenderer;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Styled = require('rsg-components/Styled');

var _Styled2 = _interopRequireDefault(_Styled);

var _Markdown = require('rsg-components/Markdown');

var _Markdown2 = _interopRequireDefault(_Markdown);

var _Code = require('rsg-components/Code');

var _Code2 = _interopRequireDefault(_Code);

var _Name = require('rsg-components/Name');

var _Name2 = _interopRequireDefault(_Name);

var _reactGroup = require('react-group');

var _reactGroup2 = _interopRequireDefault(_reactGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var styles = exports.styles = function styles(_ref) {
	var color = _ref.color;
	return {
		type: {
			fontSize: 'inherit',
			color: color.type
		}
	};
};

function ArgumentRenderer(_ref2) {
	var classes = _ref2.classes,
	    name = _ref2.name,
	    type = _ref2.type,
	    description = _ref2.description,
	    returns = _ref2.returns,
	    props = _objectWithoutProperties(_ref2, ['classes', 'name', 'type', 'description', 'returns']);

	return _react2.default.createElement(
		_reactGroup2.default,
		props,
		returns && 'Returns',
		name && _react2.default.createElement(
			'span',
			null,
			_react2.default.createElement(_Name2.default, { name: name }),
			type && ':'
		),
		type && _react2.default.createElement(
			_Code2.default,
			{ className: classes.type },
			type.name
		),
		description && _react2.default.createElement(_Markdown2.default, { text: '\u2014 ' + description, inline: true })
	);
}

ArgumentRenderer.propTypes = {
	classes: _propTypes2.default.object.isRequired,
	name: _propTypes2.default.string,
	type: _propTypes2.default.object,
	description: _propTypes2.default.string,
	returns: _propTypes2.default.bool
};

exports.default = (0, _Styled2.default)(styles)(ArgumentRenderer);