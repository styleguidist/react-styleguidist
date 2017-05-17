'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ExamplePlaceholderRenderer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Styled = require('rsg-components/Styled');

var _Styled2 = _interopRequireDefault(_Styled);

var _Markdown = require('rsg-components/Markdown');

var _Markdown2 = _interopRequireDefault(_Markdown);

var _consts = require('../../../scripts/consts');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = function styles(_ref) {
	var fontFamily = _ref.fontFamily,
	    fontSize = _ref.fontSize,
	    color = _ref.color;
	return {
		button: {
			padding: 0,
			fontSize: fontSize.base,
			fontFamily: fontFamily.base,
			textDecoration: 'underline',
			color: color.light,
			border: 0,
			cursor: 'pointer',
			background: 'transparent',
			'&:hover, &:active': {
				isolate: false,
				color: color.lightest
			}
		}
	};
};

var ExamplePlaceholderRenderer = exports.ExamplePlaceholderRenderer = function (_Component) {
	_inherits(ExamplePlaceholderRenderer, _Component);

	function ExamplePlaceholderRenderer() {
		_classCallCheck(this, ExamplePlaceholderRenderer);

		var _this = _possibleConstructorReturn(this, (ExamplePlaceholderRenderer.__proto__ || Object.getPrototypeOf(ExamplePlaceholderRenderer)).call(this));

		_this.handleOpen = _this.handleOpen.bind(_this);
		_this.state = {
			isVisible: false
		};
		return _this;
	}

	_createClass(ExamplePlaceholderRenderer, [{
		key: 'handleOpen',
		value: function handleOpen() {
			this.setState({ isVisible: true });
		}
	}, {
		key: 'render',
		value: function render() {
			var _props = this.props,
			    classes = _props.classes,
			    name = _props.name;
			var isVisible = this.state.isVisible;

			if (isVisible) {
				return _react2.default.createElement(_Markdown2.default, {
					text: '\nCreate **Readme.md** or **' + name + '.md** file in the component\u2019s folder like this:\n\n    ' + name + ' example:\n\n        &lt;' + name + ' pizza="&#x1f355;" /&gt;\n\nYou may need to **restart** the style guide server after adding an example file.\n\nRead more in the [documenting components guide](' + _consts.DOCS_DOCUMENTING + ').\n\t\t\t\t\t'
				});
			}

			return _react2.default.createElement(
				'button',
				{ className: classes.button, onClick: this.handleOpen },
				'Add examples to this component'
			);
		}
	}]);

	return ExamplePlaceholderRenderer;
}(_react.Component);

ExamplePlaceholderRenderer.propTypes = {
	classes: _propTypes2.default.object.isRequired,
	name: _propTypes2.default.string
};
exports.default = (0, _Styled2.default)(styles)(ExamplePlaceholderRenderer);