'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.LogoRenderer = LogoRenderer;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Styled = require('rsg-components/Styled');

var _Styled2 = _interopRequireDefault(_Styled);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles(_ref) {
	var color = _ref.color,
	    fontFamily = _ref.fontFamily,
	    fontSize = _ref.fontSize;
	return {
		logo: {
			color: color.base,
			margin: 0,
			fontFamily: fontFamily.base,
			fontSize: fontSize.h4,
			fontWeight: 'normal'
		}
	};
};

function LogoRenderer(_ref2) {
	var classes = _ref2.classes,
	    children = _ref2.children;

	return _react2.default.createElement(
		'h1',
		{ className: classes.logo },
		children
	);
}

LogoRenderer.propTypes = {
	classes: _propTypes2.default.object.isRequired,
	children: _propTypes2.default.node
};

exports.default = (0, _Styled2.default)(styles)(LogoRenderer);