'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.NameRenderer = NameRenderer;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Code = require('rsg-components/Code');

var _Code2 = _interopRequireDefault(_Code);

var _Styled = require('rsg-components/Styled');

var _Styled2 = _interopRequireDefault(_Styled);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var styles = function styles(_ref) {
	var fontFamily = _ref.fontFamily,
	    fontSize = _ref.fontSize,
	    color = _ref.color;
	return {
		name: {
			fontFamily: fontFamily.monospace,
			fontSize: fontSize.small,
			color: color.name
		},
		isDeprecated: {
			color: color.light,
			textDecoration: 'line-through'
		}
	};
};

function NameRenderer(_ref2) {
	var classes = _ref2.classes,
	    name = _ref2.name,
	    deprecated = _ref2.deprecated;

	var classNames = (0, _classnames2.default)(classes.name, _defineProperty({}, classes.isDeprecated, deprecated));
	return _react2.default.createElement(
		_Code2.default,
		{ className: classNames },
		name
	);
}

NameRenderer.propTypes = {
	classes: _propTypes2.default.object.isRequired,
	name: _propTypes2.default.string.isRequired,
	deprecated: _propTypes2.default.bool
};

exports.default = (0, _Styled2.default)(styles)(NameRenderer);