'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.MessageRenderer = MessageRenderer;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Markdown = require('rsg-components/Markdown');

var _Markdown2 = _interopRequireDefault(_Markdown);

var _Styled = require('rsg-components/Styled');

var _Styled2 = _interopRequireDefault(_Styled);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles(_ref) {
	var space = _ref.space;
	return {
		root: {
			marginBottom: space[4]
		}
	};
};

function MessageRenderer(_ref2) {
	var classes = _ref2.classes,
	    children = _ref2.children;

	return _react2.default.createElement(
		'div',
		{ className: classes.root },
		_react2.default.createElement(_Markdown2.default, { text: Array.isArray(children) ? children.join('\n') : children })
	);
}

MessageRenderer.propTypes = {
	classes: _propTypes2.default.object.isRequired,
	children: _propTypes2.default.node.isRequired
};

exports.default = (0, _Styled2.default)(styles)(MessageRenderer);