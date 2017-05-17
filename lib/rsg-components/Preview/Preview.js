'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _noop = require('lodash/noop');

var _noop2 = _interopRequireDefault(_noop);

var _buble = require('buble');

var _PlaygroundError = require('rsg-components/PlaygroundError');

var _PlaygroundError2 = _interopRequireDefault(_PlaygroundError);

var _Wrapper = require('rsg-components/Wrapper');

var _Wrapper2 = _interopRequireDefault(_Wrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable react/no-multi-comp */

var _compileCode = function _compileCode(code, config) {
	return (0, _buble.transform)(code, config).code;
};

// Wrap everything in a React component to leverage the state management of this component

var PreviewComponent = function (_Component) {
	_inherits(PreviewComponent, _Component);

	function PreviewComponent() {
		_classCallCheck(this, PreviewComponent);

		var _this = _possibleConstructorReturn(this, (PreviewComponent.__proto__ || Object.getPrototypeOf(PreviewComponent)).call(this));

		_this.state = {};
		_this.setState = _this.setState.bind(_this);
		_this.setInitialState = _this.setInitialState.bind(_this);
		return _this;
	}

	// Synchronously set initial state, so it will be ready before first render
	// Ignore all consequent calls


	_createClass(PreviewComponent, [{
		key: 'setInitialState',
		value: function setInitialState(initialState) {
			Object.assign(this.state, initialState);
			this.setInitialState = _noop2.default;
		}
	}, {
		key: 'render',
		value: function render() {
			return this.props.component(this.state, this.setState, this.setInitialState);
		}
	}]);

	return PreviewComponent;
}(_react.Component);

PreviewComponent.propTypes = {
	component: _propTypes2.default.func.isRequired
};

var Preview = function (_Component2) {
	_inherits(Preview, _Component2);

	function Preview() {
		var _ref;

		var _temp, _this2, _ret;

		_classCallCheck(this, Preview);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = Preview.__proto__ || Object.getPrototypeOf(Preview)).call.apply(_ref, [this].concat(args))), _this2), _this2.state = {
			error: null
		}, _temp), _possibleConstructorReturn(_this2, _ret);
	}

	_createClass(Preview, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.executeCode();
		}
	}, {
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate(nextProps, nextState) {
			return this.state.error !== nextState.error || this.props.code !== nextProps.code;
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate(prevProps) {
			if (this.props.code !== prevProps.code) {
				this.executeCode();
			}
		}
	}, {
		key: 'executeCode',
		value: function executeCode() {
			var _this3 = this;

			this.setState({
				error: null
			});

			var code = this.props.code;

			if (!code) {
				return;
			}

			var compiledCode = this.compileCode(code);
			if (!compiledCode) {
				return;
			}

			var exampleComponent = this.evalInContext(compiledCode);
			var wrappedComponent = _react2.default.createElement(
				_Wrapper2.default,
				null,
				_react2.default.createElement(PreviewComponent, { component: exampleComponent })
			);

			window.requestAnimationFrame(function () {
				try {
					_reactDom2.default.render(wrappedComponent, _this3.mountNode);
				} catch (err) {
					_this3.handleError(err);
				}
			});
		}
	}, {
		key: 'compileCode',
		value: function compileCode(code) {
			try {
				return _compileCode(code, this.context.config.compilerConfig);
			} catch (err) {
				this.handleError(err);
			}
			return false;
		}
	}, {
		key: 'evalInContext',
		value: function evalInContext(compiledCode) {
			// 1. Use setter/with to call our callback function when user write `initialState = {...}`
			// 2. Wrap code in JSON.stringify/eval to catch the component and return it
			var exampleComponentCode = '\n\t\t\tvar stateWrapper = {\n\t\t\t\tset initialState(value) {\n\t\t\t\t\t__setInitialState(value)\n\t\t\t\t},\n\t\t\t}\n\t\t\twith (stateWrapper) {\n\t\t\t\treturn eval(' + JSON.stringify(compiledCode) + ')\n\t\t\t}\n\t\t';

			return this.props.evalInContext(exampleComponentCode);
		}
	}, {
		key: 'handleError',
		value: function handleError(err) {
			if (this.mountNode) {
				_reactDom2.default.unmountComponentAtNode(this.mountNode);
			}

			this.setState({
				error: err.toString()
			});

			console.error(err); // eslint-disable-line no-console
		}
	}, {
		key: 'render',
		value: function render() {
			var _this4 = this;

			var error = this.state.error;

			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement('div', { ref: function ref(_ref2) {
						return _this4.mountNode = _ref2;
					} }),
				error && _react2.default.createElement(_PlaygroundError2.default, { message: error })
			);
		}
	}]);

	return Preview;
}(_react.Component);

Preview.propTypes = {
	code: _propTypes2.default.string.isRequired,
	evalInContext: _propTypes2.default.func.isRequired
};
Preview.contextTypes = {
	config: _propTypes2.default.object.isRequired
};
exports.default = Preview;