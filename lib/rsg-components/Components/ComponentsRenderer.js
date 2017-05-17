'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = ComponentsRenderer;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ComponentsRenderer(_ref) {
	var children = _ref.children;

	return _react2.default.createElement(
		'div',
		null,
		children
	);
}
ComponentsRenderer.propTypes = {
	children: _propTypes2.default.node.isRequired
};