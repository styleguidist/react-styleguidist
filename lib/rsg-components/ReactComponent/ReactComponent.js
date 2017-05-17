'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = ReactComponent;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Props = require('rsg-components/Props');

var _Props2 = _interopRequireDefault(_Props);

var _Methods = require('rsg-components/Methods');

var _Methods2 = _interopRequireDefault(_Methods);

var _Examples = require('rsg-components/Examples');

var _Examples2 = _interopRequireDefault(_Examples);

var _ReactComponentRenderer = require('rsg-components/ReactComponent/ReactComponentRenderer');

var _ReactComponentRenderer2 = _interopRequireDefault(_ReactComponentRenderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ExamplePlaceholder = process.env.NODE_ENV === 'development' ? require('rsg-components/ExamplePlaceholder').default : function () {
	return _react2.default.createElement('div', null);
};

function ReactComponent(_ref, _ref2) {
	var component = _ref.component;
	var _ref2$isolatedCompone = _ref2.isolatedComponent,
	    isolatedComponent = _ref2$isolatedCompone === undefined ? false : _ref2$isolatedCompone;
	var name = component.name,
	    slug = component.slug,
	    pathLine = component.pathLine,
	    metadata = component.metadata;
	var _component$props = component.props,
	    description = _component$props.description,
	    props = _component$props.props,
	    examples = _component$props.examples,
	    methods = _component$props.methods,
	    tags = _component$props.tags;

	if (!name) {
		return null;
	}

	return _react2.default.createElement(_ReactComponentRenderer2.default, {
		name: name,
		slug: slug,
		pathLine: pathLine,
		metadata: metadata,
		description: description,
		props: props && _react2.default.createElement(_Props2.default, { props: props }),
		methods: methods.length > 0 && _react2.default.createElement(_Methods2.default, { methods: methods }),
		examples: examples.length > 0 ? _react2.default.createElement(_Examples2.default, { examples: examples, name: name }) : _react2.default.createElement(ExamplePlaceholder, { name: name }),
		isolated: isolatedComponent,
		tags: tags
	});
}

ReactComponent.propTypes = {
	component: _propTypes2.default.object.isRequired
};

ReactComponent.contextTypes = {
	isolatedComponent: _propTypes2.default.bool
};