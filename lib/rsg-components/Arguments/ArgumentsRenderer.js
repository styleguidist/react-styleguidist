'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.styles = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.ArgumentsRenderer = ArgumentsRenderer;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Argument = require('rsg-components/Argument');

var _Argument2 = _interopRequireDefault(_Argument);

var _Styled = require('rsg-components/Styled');

var _Styled2 = _interopRequireDefault(_Styled);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = exports.styles = function styles(_ref) {
	var space = _ref.space;
	return {
		root: {
			marginBottom: space[2],
			fontSize: 'inherit'
		}
	};
};

function ArgumentsRenderer(_ref2) {
	var classes = _ref2.classes,
	    args = _ref2.args;

	if (args.length === 0) {
		return null;
	}

	return _react2.default.createElement(
		'div',
		{ className: classes.root },
		args.map(function (arg) {
			return _react2.default.createElement(_Argument2.default, _extends({ key: arg.name }, arg));
		})
	);
}

ArgumentsRenderer.propTypes = {
	classes: _propTypes2.default.object.isRequired,
	args: _propTypes2.default.arrayOf(_propTypes2.default.shape({
		name: _propTypes2.default.string.isRequired,
		type: _propTypes2.default.object,
		description: _propTypes2.default.string
	})).isRequired
};

exports.default = (0, _Styled2.default)(styles)(ArgumentsRenderer);