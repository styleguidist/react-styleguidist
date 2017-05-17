'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.styles = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.LinkRenderer = LinkRenderer;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Styled = require('rsg-components/Styled');

var _Styled2 = _interopRequireDefault(_Styled);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var styles = exports.styles = function styles(_ref) {
	var color = _ref.color;
	return {
		link: {
			'&, &:link, &:visited': {
				fontSize: 'inherit',
				color: color.link,
				textDecoration: 'none'
			},
			'&:hover, &:active': {
				isolate: false,
				color: color.linkHover,
				cursor: 'pointer'
			}
		}
	};
};

function LinkRenderer(_ref2) {
	var classes = _ref2.classes,
	    children = _ref2.children,
	    props = _objectWithoutProperties(_ref2, ['classes', 'children']);

	return _react2.default.createElement(
		'a',
		_extends({}, props, { className: (0, _classnames2.default)(classes.link, props.className) }),
		children
	);
}

LinkRenderer.propTypes = {
	children: _propTypes2.default.node,
	className: _propTypes2.default.string,
	classes: _propTypes2.default.object.isRequired
};

exports.default = (0, _Styled2.default)(styles)(LinkRenderer);