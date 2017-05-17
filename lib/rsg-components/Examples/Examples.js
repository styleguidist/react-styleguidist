'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = Examples;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Playground = require('rsg-components/Playground');

var _Playground2 = _interopRequireDefault(_Playground);

var _Markdown = require('rsg-components/Markdown');

var _Markdown2 = _interopRequireDefault(_Markdown);

var _ExamplesRenderer = require('rsg-components/Examples/ExamplesRenderer');

var _ExamplesRenderer2 = _interopRequireDefault(_ExamplesRenderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Examples(_ref, _ref2) {
	var examples = _ref.examples,
	    name = _ref.name;
	var codeKey = _ref2.codeKey;

	return _react2.default.createElement(
		_ExamplesRenderer2.default,
		null,
		examples.map(function (example, index) {
			switch (example.type) {
				case 'code':
					return _react2.default.createElement(_Playground2.default, {
						code: example.content,
						evalInContext: example.evalInContext,
						key: codeKey + '/' + index,
						name: name,
						index: index
					});
				case 'markdown':
					return _react2.default.createElement(_Markdown2.default, { text: example.content, key: index });
				default:
					return null;
			}
		})
	);
}
Examples.propTypes = {
	examples: _propTypes2.default.array.isRequired,
	name: _propTypes2.default.string
};
Examples.contextTypes = {
	codeKey: _propTypes2.default.number.isRequired
};