'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.PlaygroundErrorRenderer = PlaygroundErrorRenderer;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Styled = require('rsg-components/Styled');

var _Styled2 = _interopRequireDefault(_Styled);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles(_ref) {
	var fontFamily = _ref.fontFamily,
	    fontSize = _ref.fontSize,
	    color = _ref.color,
	    space = _ref.space;
	return {
		root: {
			margin: [[-space[2], -space[2], -(space[2] + space[0])]],
			padding: space[2],
			lineHeight: 1.2,
			fontSize: fontSize.small,
			fontFamily: fontFamily.monospace,
			color: color.error,
			backgroundColor: color.errorBackground,
			whiteSpace: 'pre'
		}
	};
};

function PlaygroundErrorRenderer(_ref2) {
	var classes = _ref2.classes,
	    message = _ref2.message;

	return _react2.default.createElement(
		'pre',
		{ className: classes.root },
		message
	);
}

PlaygroundErrorRenderer.propTypes = {
	classes: _propTypes2.default.object.isRequired,
	message: _propTypes2.default.string.isRequired
};

exports.default = (0, _Styled2.default)(styles)(PlaygroundErrorRenderer);