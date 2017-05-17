'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.styles = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.HeadingRenderer = HeadingRenderer;

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
	var color = _ref.color,
	    space = _ref.space,
	    fontSize = _ref.fontSize;
	return {
		heading: {
			color: color.base,
			position: 'relative',
			overflow: 'visible',
			marginLeft: -space[4],
			paddingLeft: space[4],
			'&:hover > $anchor': {
				isolate: false,
				visibility: 'visible'
			}
		},
		anchor: {
			position: 'absolute',
			top: '50%',
			transform: 'translateY(-50%)',
			left: space[1],
			display: 'block',
			color: color.link,
			fontSize: fontSize.h3,
			fontWeight: 'normal',
			textDecoration: 'none',
			visibility: 'hidden',
			'&:hover, &:active': {
				isolate: false,
				color: color.linkHover,
				cursor: 'pointer'
			}
		}
	};
};

function HeadingRenderer(_ref2) {
	var classes = _ref2.classes,
	    children = _ref2.children,
	    slug = _ref2.slug,
	    level = _ref2.level,
	    props = _objectWithoutProperties(_ref2, ['classes', 'children', 'slug', 'level']);

	var Tag = 'h' + level;
	return _react2.default.createElement(
		Tag,
		_extends({}, props, { id: slug, className: (0, _classnames2.default)(classes.heading, props.className) }),
		_react2.default.createElement(
			'a',
			{ className: classes.anchor, href: '#' + slug, 'aria-hidden': true },
			'#'
		),
		children
	);
}

HeadingRenderer.propTypes = {
	children: _propTypes2.default.node,
	className: _propTypes2.default.string,
	classes: _propTypes2.default.object.isRequired,
	slug: _propTypes2.default.string.isRequired,
	level: _propTypes2.default.oneOf([1, 2, 3, 4, 5, 6]).isRequired
};

exports.default = (0, _Styled2.default)(styles)(HeadingRenderer);