'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.PlaygroundRenderer = PlaygroundRenderer;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Editor = require('rsg-components/Editor');

var _Editor2 = _interopRequireDefault(_Editor);

var _Link = require('rsg-components/Link');

var _Link2 = _interopRequireDefault(_Link);

var _Preview = require('rsg-components/Preview');

var _Preview2 = _interopRequireDefault(_Preview);

var _Styled = require('rsg-components/Styled');

var _Styled2 = _interopRequireDefault(_Styled);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles(_ref) {
	var space = _ref.space,
	    color = _ref.color,
	    fontFamily = _ref.fontFamily,
	    fontSize = _ref.fontSize,
	    borderRadius = _ref.borderRadius;
	return {
		root: {
			color: color.base,
			position: 'relative',
			marginBottom: space[4],
			border: [[1, color.border, 'solid']],
			borderRadius: [[borderRadius, borderRadius, 0, borderRadius]],
			marginTop: space[0],
			'&:hover $isolatedLink': {
				isolate: false,
				opacity: 1
			}
		},
		preview: {
			marginBottom: space[0],
			padding: space[2]
		},
		codeToggle: {
			position: 'absolute',
			right: -1,
			margin: 0,
			padding: [[space[0], space[1]]],
			fontFamily: fontFamily.base,
			fontSize: fontSize.base,
			lineHeight: 1,
			color: color.link,
			border: [[1, color.border, 'solid']],
			borderTop: 0,
			borderBottomLeftRadius: borderRadius,
			borderBottomRightRadius: borderRadius,
			cursor: 'pointer',
			'&:hover, &:active': {
				isolate: false,
				color: color.linkHover
			}
		},
		showCode: {
			composes: '$codeToggle',
			backgroundColor: color.baseBackground
		},
		hideCode: {
			composes: '$codeToggle',
			backgroundColor: color.codeBackground
		},
		isolatedLink: {
			position: 'absolute',
			top: 0,
			right: 0,
			padding: [[space[0], space[1]]],
			fontFamily: fontFamily.base,
			fontSize: fontSize.base,
			opacity: 0,
			transition: 'opacity ease-in-out .15s .2s'
		}
	};
};

function PlaygroundRenderer(_ref2) {
	var classes = _ref2.classes,
	    code = _ref2.code,
	    showCode = _ref2.showCode,
	    name = _ref2.name,
	    index = _ref2.index,
	    isolatedExample = _ref2.isolatedExample,
	    evalInContext = _ref2.evalInContext,
	    onChange = _ref2.onChange,
	    onCodeToggle = _ref2.onCodeToggle;

	var hideCodeButton = _react2.default.createElement(
		'div',
		null,
		_react2.default.createElement(_Editor2.default, { code: code, onChange: onChange }),
		_react2.default.createElement(
			'button',
			{ type: 'button', className: classes.hideCode, onClick: onCodeToggle },
			'Hide code'
		)
	);
	var showCodeButton = _react2.default.createElement(
		'button',
		{ type: 'button', className: classes.showCode, onClick: onCodeToggle },
		'Show code'
	);

	return _react2.default.createElement(
		'div',
		{ className: classes.root },
		_react2.default.createElement(
			'div',
			{ className: classes.preview, 'data-preview': name ? name : '' },
			_react2.default.createElement(
				'div',
				{ className: classes.isolatedLink },
				name && (isolatedExample ? _react2.default.createElement(
					_Link2.default,
					{ href: '#!/' + name },
					'\u21FD Exit Isolation'
				) : _react2.default.createElement(
					_Link2.default,
					{ href: '#!/' + name + '/' + index },
					'Open isolated \u21E2'
				))
			),
			_react2.default.createElement(_Preview2.default, { code: code, evalInContext: evalInContext })
		),
		showCode ? hideCodeButton : showCodeButton
	);
}

PlaygroundRenderer.propTypes = {
	classes: _propTypes2.default.object.isRequired,
	code: _propTypes2.default.string.isRequired,
	showCode: _propTypes2.default.bool.isRequired,
	index: _propTypes2.default.number.isRequired,
	evalInContext: _propTypes2.default.func.isRequired,
	onChange: _propTypes2.default.func.isRequired,
	onCodeToggle: _propTypes2.default.func.isRequired,
	name: _propTypes2.default.string,
	isolatedExample: _propTypes2.default.bool
};

exports.default = (0, _Styled2.default)(styles)(PlaygroundRenderer);