'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.CodeRenderer = CodeRenderer;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Styled = require('rsg-components/Styled');

var _Styled2 = _interopRequireDefault(_Styled);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles(_ref) {
	var fontFamily = _ref.fontFamily;
	return {
		code: {
			display: 'inline',
			fontFamily: fontFamily.monospace,
			fontSize: 'inherit',
			color: 'inherit',
			background: 'transparent'
		}
	};
};

function CodeRenderer(_ref2) {
	var classes = _ref2.classes,
	    className = _ref2.className,
	    children = _ref2.children;

	return _react2.default.createElement(
		'span',
		{ className: className },
		_react2.default.createElement(
			'code',
			{ className: classes.code },
			children
		)
	);
}

CodeRenderer.propTypes = {
	classes: _propTypes2.default.object.isRequired,
	className: _propTypes2.default.string,
	children: _propTypes2.default.node
};

exports.default = (0, _Styled2.default)(styles)(CodeRenderer);