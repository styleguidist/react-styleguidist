'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _debounce = require('lodash/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _PlaygroundRenderer = require('rsg-components/Playground/PlaygroundRenderer');

var _PlaygroundRenderer2 = _interopRequireDefault(_PlaygroundRenderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Playground = function (_Component) {
	_inherits(Playground, _Component);

	function Playground(props, context) {
		_classCallCheck(this, Playground);

		var _this = _possibleConstructorReturn(this, (Playground.__proto__ || Object.getPrototypeOf(Playground)).call(this, props, context));

		var code = props.code;
		var showCode = context.config.showCode;


		_this.state = {
			code: code,
			showCode: showCode
		};
		return _this;
	}

	_createClass(Playground, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			var code = nextProps.code;

			this.setState({
				code: code
			});
		}
	}, {
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate(nextProps, nextState) {
			return nextState.code !== this.state.code || nextState.showCode !== this.state.showCode;
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			// clear pending changes before unmount
			if (this.queuedChange) {
				this.queuedChange.cancel();
			}
		}
	}, {
		key: 'handleChange',
		value: function handleChange(code) {
			var _this2 = this;

			// clear pending changes before proceed
			if (this.queuedChange) {
				this.queuedChange.cancel();
			}

			// stored update action
			var queuedChange = function queuedChange() {
				return _this2.setState({
					code: code
				});
			};

			var previewDelay = this.context.config.previewDelay;


			if (previewDelay) {
				// if previewDelay is enabled debounce the code
				this.queuedChange = (0, _debounce2.default)(queuedChange, previewDelay);
				this.queuedChange();
			} else {
				// otherwise execute it
				queuedChange();
			}
		}
	}, {
		key: 'handleCodeToggle',
		value: function handleCodeToggle() {
			this.setState({
				showCode: !this.state.showCode
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var _this3 = this;

			var _state = this.state,
			    code = _state.code,
			    showCode = _state.showCode;
			var _props = this.props,
			    evalInContext = _props.evalInContext,
			    index = _props.index,
			    name = _props.name;
			var isolatedExample = this.context.isolatedExample;

			return _react2.default.createElement(_PlaygroundRenderer2.default, {
				code: code,
				showCode: showCode,
				index: index,
				name: name,
				isolatedExample: isolatedExample,
				evalInContext: evalInContext,
				onChange: function onChange(code) {
					return _this3.handleChange(code);
				},
				onCodeToggle: function onCodeToggle() {
					return _this3.handleCodeToggle();
				}
			});
		}
	}]);

	return Playground;
}(_react.Component);

Playground.propTypes = {
	code: _propTypes2.default.string.isRequired,
	evalInContext: _propTypes2.default.func.isRequired,
	index: _propTypes2.default.number.isRequired,
	name: _propTypes2.default.string
};
Playground.contextTypes = {
	config: _propTypes2.default.object.isRequired,
	isolatedExample: _propTypes2.default.bool
};
exports.default = Playground;