'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.WelcomeRenderer = WelcomeRenderer;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Markdown = require('rsg-components/Markdown');

var _Markdown2 = _interopRequireDefault(_Markdown);

var _Styled = require('rsg-components/Styled');

var _Styled2 = _interopRequireDefault(_Styled);

var _consts = require('../../../scripts/consts');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles(_ref) {
	var space = _ref.space,
	    maxWidth = _ref.maxWidth;
	return {
		root: {
			maxWidth: maxWidth,
			margin: [[0, 'auto']],
			padding: space[4]
		}
	};
};

function WelcomeRenderer(_ref2) {
	var classes = _ref2.classes,
	    patterns = _ref2.patterns;

	return _react2.default.createElement(
		'div',
		{ className: classes.root },
		_react2.default.createElement(_Markdown2.default, {
			text: '\n# Welcome to React Styleguidist!\n\n**We couldn\u2019t find any components** using these patterns:\n\n' + patterns.map(function (p) {
				return '- `' + p + '`';
			}).join('\n') + '\n\nCreate **styleguide.config.js** file in your project root directory like this:\n\n    module.exports = {\n      components: \'src/components/**/*.js\'\n    };\n\nRead more in the [locating components guide](' + _consts.DOCS_COMPONENTS + ').\n\t\t\t\t'
		})
	);
}

WelcomeRenderer.propTypes = {
	classes: _propTypes2.default.object.isRequired,
	patterns: _propTypes2.default.array.isRequired
};

exports.default = (0, _Styled2.default)(styles)(WelcomeRenderer);