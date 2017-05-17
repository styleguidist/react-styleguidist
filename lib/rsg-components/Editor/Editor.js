'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _debounce = require('lodash/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _reactCodemirror = require('react-codemirror');

var _reactCodemirror2 = _interopRequireDefault(_reactCodemirror);

require('codemirror/mode/jsx/jsx');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// We’re explicitly specifying Webpack loaders here so we could skip specifying them in Webpack configuration.
// That way we could avoid clashes between our loaders and user loaders.
require('!!../../../loaders/style-loader!../../../loaders/css-loader!codemirror/lib/codemirror.css');
require('!!../../../loaders/style-loader!../../../loaders/css-loader!rsg-codemirror-theme.css');

var codemirrorOptions = {
	mode: 'jsx',
	lineNumbers: false,
	lineWrapping: true,
	smartIndent: false,
	matchBrackets: true,
	viewportMargin: Infinity
};

var UPDATE_DELAY = 10;

var Editor = function (_Component) {
	_inherits(Editor, _Component);

	function Editor() {
		_classCallCheck(this, Editor);

		var _this = _possibleConstructorReturn(this, (Editor.__proto__ || Object.getPrototypeOf(Editor)).call(this));

		_this.handleChange = (0, _debounce2.default)(_this.handleChange.bind(_this), UPDATE_DELAY);
		return _this;
	}

	_createClass(Editor, [{
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate() {
			return false;
		}
	}, {
		key: 'handleChange',
		value: function handleChange(newCode) {
			this.props.onChange(newCode);
		}
	}, {
		key: 'render',
		value: function render() {
			var code = this.props.code;
			var highlightTheme = this.context.config.highlightTheme;

			var options = _extends({}, codemirrorOptions, {
				theme: highlightTheme
			});
			return _react2.default.createElement(_reactCodemirror2.default, { value: code, onChange: this.handleChange, options: options });
		}
	}]);

	return Editor;
}(_react.Component);

Editor.propTypes = {
	code: _propTypes2.default.string.isRequired,
	onChange: _propTypes2.default.func.isRequired
};
Editor.contextTypes = {
	config: _propTypes2.default.object.isRequired
};
exports.default = Editor;