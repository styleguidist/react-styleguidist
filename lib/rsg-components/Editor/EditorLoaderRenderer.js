'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.EditorLoaderRenderer = EditorLoaderRenderer;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Styled = require('rsg-components/Styled');

var _Styled2 = _interopRequireDefault(_Styled);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles(_ref) {
	var fontFamily = _ref.fontFamily,
	    color = _ref.color,
	    space = _ref.space,
	    fontSize = _ref.fontSize;
	return {
		root: {
			padding: [[space[1], space[2], space[1], space[1]]],
			fontFamily: fontFamily.base,
			fontSize: fontSize.small,
			color: color.light,
			backgroundColor: color.codeBackground
		},
		// Tweak CodeMirror styles. Duplicate selectors are for increased specificity
		'@global': {
			'.CodeMirror.CodeMirror': {
				fontFamily: fontFamily.monospace,
				height: 'auto',
				padding: [[space[0], space[2]]],
				fontSize: fontSize.small
			},
			'.CodeMirror.CodeMirror pre': {
				padding: 0
			},
			'.CodeMirror-scroll.CodeMirror-scroll': {
				height: 'auto',
				overflowY: 'hidden',
				overflowX: 'auto'
			},
			'.cm-error.cm-error': {
				background: 'none'
			}
		}
	};
};

function EditorLoaderRenderer(_ref2) {
	var classes = _ref2.classes;

	return _react2.default.createElement(
		'div',
		{ className: classes.root },
		'Loading\u2026'
	);
}

EditorLoaderRenderer.propTypes = {
	classes: _propTypes2.default.object.isRequired
};

exports.default = (0, _Styled2.default)(styles)(EditorLoaderRenderer);