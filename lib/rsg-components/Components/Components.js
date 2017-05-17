'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = Components;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ReactComponent = require('rsg-components/ReactComponent');

var _ReactComponent2 = _interopRequireDefault(_ReactComponent);

var _ComponentsRenderer = require('rsg-components/Components/ComponentsRenderer');

var _ComponentsRenderer2 = _interopRequireDefault(_ComponentsRenderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Components(_ref) {
	var components = _ref.components;

	return _react2.default.createElement(
		_ComponentsRenderer2.default,
		null,
		components.map(function (component) {
			return _react2.default.createElement(_ReactComponent2.default, { key: component.filepath, component: component });
		})
	);
}

Components.propTypes = {
	components: _propTypes2.default.array.isRequired
};