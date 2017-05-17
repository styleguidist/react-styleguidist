'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _EditorLoaderRenderer = require('rsg-components/Editor/EditorLoaderRenderer');

var _EditorLoaderRenderer2 = _interopRequireDefault(_EditorLoaderRenderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* istanbul ignore if  */
// FIX: require.ensure polyfill for tests
// Can’t make it work from tests, it shouldn’t be in the app code.
if (typeof require.ensure !== 'function') {
	require.ensure = function (d, c) {
		return c(require);
	};
}

var EditorLoader = function (_Component) {
	_inherits(EditorLoader, _Component);

	function EditorLoader() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, EditorLoader);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = EditorLoader.__proto__ || Object.getPrototypeOf(EditorLoader)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
			editor: null
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(EditorLoader, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this2 = this;

			require.ensure(['rsg-components/Editor/Editor'], function (require) {
				_this2.setState({
					editor: require('rsg-components/Editor/Editor').default
				});
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var Editor = this.state.editor;
			if (Editor) {
				return _react2.default.createElement(Editor, this.props);
			}

			return _react2.default.createElement(_EditorLoaderRenderer2.default, null);
		}
	}]);

	return EditorLoader;
}(_react.Component);

exports.default = EditorLoader;