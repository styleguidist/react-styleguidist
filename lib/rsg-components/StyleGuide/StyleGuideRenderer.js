'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.StyleGuideRenderer = StyleGuideRenderer;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

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

function renderListModeToggle(listMode, listTypes, onListToggle) {
	return _react2.default.createElement(
		'ul',
		{ className: 'list-toggle' },
		listTypes.map(function (type, idx) {
			return _react2.default.createElement(
				'li',
				{
					key: idx,
					onClick: function onClick() {
						return onListToggle(type);
					},
					className: listMode === type ? 'active' : ''
				},
				type
			);
		})
	);
}

function StyleGuideRenderer(props) {
	var listMode = props.listMode,
	    listTypes = props.listTypes,
	    onListToggle = props.onListToggle,
	    classes = props.classes,
	    title = props.title,
	    homepageUrl = props.homepageUrl,
	    children = props.children,
	    toc = props.toc,
	    hasSidebar = props.hasSidebar;


	return _react2.default.createElement(
		'div',
		{ className: (0, _classnames2.default)(classes.root, hasSidebar && classes.hasSidebar) },
		_react2.default.createElement(
			'main',
			{ className: (0, _classnames2.default)(classes.content, !hasSidebar ? 'fullwidth' : '') },
			' ',
			children,
			_react2.default.createElement(
				'footer',
				{ className: classes.footer },
				_react2.default.createElement(_Markdown2.default, { text: 'Generated with [React Styleguidist](' + homepageUrl + ')' })
			)
		),
		hasSidebar && _react2.default.createElement(
			'div',
			{ className: (0, _classnames2.default)(classes.sidebar, 'sidebar') },
			_react2.default.createElement(
				'div',
				{ className: classes.logo },
				_react2.default.createElement(
					'svg',
					{
						id: 'RCL-Logo',
						className: 'RCL-Logo',
						'data-name': 'Layer 1',
						xmlns: 'http://www.w3.org/2000/svg',
						viewBox: '0 0 604.46 284.5'
					},
					_react2.default.createElement('defs', null),
					_react2.default.createElement(
						'title',
						null,
						'RCL-Logo'
					),
					_react2.default.createElement('path', {
						className: 'cls-1',
						d: 'M369.45,710.25,310.83,603.09H288.61V710.25H224.92v-270h103a178.86,178.86,0,0,1,37.95,4A98.76,98.76,0,0,1,399,457.79,70.91,70.91,0,0,1,422.46,483q8.77,15.64,8.77,38.9,0,27.46-14.87,46.14t-41.19,26.7l70.55,115.55ZM366.78,523q0-9.53-4-15.45a27.55,27.55,0,0,0-10.34-9.15A45.24,45.24,0,0,0,338.23,494a105.1,105.1,0,0,0-15.14-1.14H288.22V555.8h31a105,105,0,0,0,16.48-1.33,52.63,52.63,0,0,0,15.33-4.77,29.17,29.17,0,0,0,11.3-9.92Q366.78,533.3,366.78,523Z',
						transform: 'translate(-224.92 -433)'
					}),
					_react2.default.createElement('path', {
						className: 'cls-1',
						d: 'M629.16,705.48q-26.31,12-60.64,12-31.27,0-57.78-10.3a133.39,133.39,0,0,1-76.46-74.37q-11.07-26.31-11.06-58,0-32.41,11.25-58.73a130.6,130.6,0,0,1,31.08-44.81,137.7,137.7,0,0,1,46.53-28.41,166.79,166.79,0,0,1,113.84.19q27.64,10.11,44.81,29.56L626.49,516.9a54.77,54.77,0,0,0-24-18.69,79.75,79.75,0,0,0-30.51-6.1,77.26,77.26,0,0,0-31.46,6.29,73.81,73.81,0,0,0-24.6,17.35,79.12,79.12,0,0,0-16,26.12,92.22,92.22,0,0,0-5.72,33,94.86,94.86,0,0,0,5.72,33.56,78.13,78.13,0,0,0,15.83,26.12,71.19,71.19,0,0,0,24.22,17,76.94,76.94,0,0,0,30.89,6.1q19.45,0,33.94-7.63A65.81,65.81,0,0,0,628,630.16l45.38,42.71A128.55,128.55,0,0,1,629.16,705.48Z',
						transform: 'translate(-224.92 -433)'
					}),
					_react2.default.createElement('path', {
						className: 'cls-1',
						d: 'M659.29,710.25v-270h65.59V653.43H829.38v56.82Z',
						transform: 'translate(-224.92 -433)'
					})
				)
			),
			renderListModeToggle(listMode, listTypes, onListToggle),
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
	hasSidebar: _propTypes2.default.bool,
	listMode: _propTypes2.default.string,
	listTypes: _propTypes2.default.array,
	onListToggle: _propTypes2.default.func
};

exports.default = (0, _Styled2.default)(styles)(StyleGuideRenderer);