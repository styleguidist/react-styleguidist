'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.SectionsRenderer = SectionsRenderer;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Styled = require('rsg-components/Styled');

var _Styled2 = _interopRequireDefault(_Styled);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles() {
	return {
		// Just default jss-isolate rules
		root: {}
	};
};

function SectionsRenderer(_ref) {
	var classes = _ref.classes,
	    children = _ref.children;

	return _react2.default.createElement(
		'section',
		{ className: classes.root },
		children
	);
}

SectionsRenderer.propTypes = {
	classes: _propTypes2.default.object.isRequired,
	children: _propTypes2.default.node
};

exports.default = (0, _Styled2.default)(styles)(SectionsRenderer);