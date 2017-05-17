'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.StyleGuideRenderer = StyleGuideRenderer;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Logo = require('rsg-components/Logo');

var _Logo2 = _interopRequireDefault(_Logo);

var _Markdown = require('rsg-components/Markdown');

var _Markdown2 = _interopRequireDefault(_Markdown);

var _Styled = require('rsg-components/Styled');

var _Styled2 = _interopRequireDefault(_Styled);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var styles = function styles(_ref) {
	var _content;

	var color = _ref.color,
	    fontFamily = _ref.fontFamily,
	    fontSize = _ref.fontSize,
	    sidebarWidth = _ref.sidebarWidth,
	    mq = _ref.mq,
	    space = _ref.space,
	    maxWidth = _ref.maxWidth;
	return {
		root: {
			color: color.base,
			backgroundColor: color.baseBackground
		},
		hasSidebar: _defineProperty({
			paddingLeft: sidebarWidth
		}, mq.small, {
			paddingLeft: 0
		}),
		content: (_content = {
			maxWidth: maxWidth,
			padding: [[space[2], space[4]]],
			margin: [[0, 'auto']]
		}, _defineProperty(_content, mq.small, {
			padding: space[2]
		}), _defineProperty(_content, 'display', 'block'), _content),
		sidebar: _defineProperty({
			backgroundColor: color.sidebarBackground,
			border: [[color.border, 'solid']],
			borderWidth: [[0, 1, 0, 0]],
			position: 'fixed',
			top: 0,
			left: 0,
			bottom: 0,
			width: sidebarWidth,
			overflow: 'auto'
		}, mq.small, {
			position: 'static',
			width: 'auto',
			borderWidth: [[1, 0, 0, 0]],
			paddingBottom: space[0]
		}),
		logo: {
			padding: space[2],
			borderBottom: [[1, color.border, 'solid']]
		},
		footer: {
			display: 'block',
			color: color.light,
			fontFamily: fontFamily.base,
			fontSize: fontSize.small
		}
	};
};

function StyleGuideRenderer(_ref2) {
	var classes = _ref2.classes,
	    title = _ref2.title,
	    homepageUrl = _ref2.homepageUrl,
	    children = _ref2.children,
	    toc = _ref2.toc,
	    hasSidebar = _ref2.hasSidebar;

	return _react2.default.createElement(
		'div',
		{ className: (0, _classnames2.default)(classes.root, hasSidebar && classes.hasSidebar) },
		_react2.default.createElement(
			'main',
			{ className: classes.content },
			children,
			_react2.default.createElement(
				'footer',
				{ className: classes.footer },
				_react2.default.createElement(_Markdown2.default, { text: 'Generated with [React Styleguidist](' + homepageUrl + ')' })
			)
		),
		hasSidebar && _react2.default.createElement(
			'div',
			{ className: classes.sidebar },
			_react2.default.createElement(
				'div',
				{ className: classes.logo },
				_react2.default.createElement(
					_Logo2.default,
					null,
					title
				)
			),
			toc
		)
	);
}

StyleGuideRenderer.propTypes = {
	classes: _propTypes2.default.object.isRequired,
	title: _propTypes2.default.string.isRequired,
	homepageUrl: _propTypes2.default.string.isRequired,
	children: _propTypes2.default.node.isRequired,
	toc: _propTypes2.default.node.isRequired,
	hasSidebar: _propTypes2.default.bool
};

exports.default = (0, _Styled2.default)(styles)(StyleGuideRenderer);