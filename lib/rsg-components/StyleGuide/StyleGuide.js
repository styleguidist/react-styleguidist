'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _TableOfContents = require('rsg-components/TableOfContents');

var _TableOfContents2 = _interopRequireDefault(_TableOfContents);

var _StyleGuideRenderer = require('rsg-components/StyleGuide/StyleGuideRenderer');

var _StyleGuideRenderer2 = _interopRequireDefault(_StyleGuideRenderer);

var _Sections = require('rsg-components/Sections');

var _Sections2 = _interopRequireDefault(_Sections);

var _Welcome = require('rsg-components/Welcome');

var _Welcome2 = _interopRequireDefault(_Welcome);

var _consts = require('../../../scripts/consts');

var _utils = require('../../utils/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StyleGuide = function (_Component) {
	_inherits(StyleGuide, _Component);

	function StyleGuide() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, StyleGuide);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = StyleGuide.__proto__ || Object.getPrototypeOf(StyleGuide)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
			searchTerm: ''
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(StyleGuide, [{
		key: 'getChildContext',
		value: function getChildContext() {
			return {
				codeKey: this.props.codeKey,
				config: this.props.config,
				isolatedComponent: this.props.isolatedComponent,
				isolatedExample: this.props.isolatedExample,
				isolatedSection: this.props.isolatedSection
			};
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props = this.props,
			    config = _props.config,
			    sections = _props.sections,
			    welcomeScreen = _props.welcomeScreen,
			    patterns = _props.patterns,
			    isolatedComponent = _props.isolatedComponent;
			var searchTerm = this.state.searchTerm;

			var filteredSections = (0, _utils.filterSectionsByName)(sections, searchTerm);

			if (welcomeScreen) {
				return _react2.default.createElement(_Welcome2.default, { patterns: patterns });
			}

			return _react2.default.createElement(
				_StyleGuideRenderer2.default,
				{
					title: config.title,
					homepageUrl: _consts.HOMEPAGE,
					hasSidebar: config.showSidebar && !isolatedComponent,
					toc: _react2.default.createElement(_TableOfContents2.default, {
						sections: filteredSections,
						searchTerm: searchTerm,
						onSearchTermChange: function onSearchTermChange(searchTerm) {
							return _this2.setState({ searchTerm: searchTerm });
						}
					})
				},
				_react2.default.createElement(_Sections2.default, { sections: filteredSections })
			);
		}
	}]);

	return StyleGuide;
}(_react.Component);

StyleGuide.propTypes = {
	codeKey: _propTypes2.default.number.isRequired,
	config: _propTypes2.default.object.isRequired,
	sections: _propTypes2.default.array.isRequired,
	welcomeScreen: _propTypes2.default.bool,
	patterns: _propTypes2.default.array,
	isolatedComponent: _propTypes2.default.bool,
	isolatedExample: _propTypes2.default.bool,
	isolatedSection: _propTypes2.default.bool
};
StyleGuide.childContextTypes = {
	codeKey: _propTypes2.default.number.isRequired,
	config: _propTypes2.default.object.isRequired,
	isolatedComponent: _propTypes2.default.bool,
	isolatedExample: _propTypes2.default.bool,
	isolatedSection: _propTypes2.default.bool
};
StyleGuide.defaultProps = {
	isolatedComponent: false
};
exports.default = StyleGuide;