'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = Sections;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Section = require('rsg-components/Section');

var _Section2 = _interopRequireDefault(_Section);

var _SectionsRenderer = require('rsg-components/Sections/SectionsRenderer');

var _SectionsRenderer2 = _interopRequireDefault(_SectionsRenderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Sections(_ref) {
	var sections = _ref.sections;

	return _react2.default.createElement(
		_SectionsRenderer2.default,
		null,
		sections.map(function (section, idx) {
			return _react2.default.createElement(_Section2.default, { key: idx, section: section });
		})
	);
}

Sections.propTypes = {
	sections: _propTypes2.default.array.isRequired
};