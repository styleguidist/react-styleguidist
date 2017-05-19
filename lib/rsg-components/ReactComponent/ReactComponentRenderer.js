'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ReactComponentRenderer = ReactComponentRenderer;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Link = require('rsg-components/Link');

var _Link2 = _interopRequireDefault(_Link);

var _Heading = require('rsg-components/Heading');

var _Heading2 = _interopRequireDefault(_Heading);

var _Markdown = require('rsg-components/Markdown');

var _Markdown2 = _interopRequireDefault(_Markdown);

var _JsDoc = require('rsg-components/JsDoc');

var _JsDoc2 = _interopRequireDefault(_JsDoc);

var _Styled = require('rsg-components/Styled');

var _Styled2 = _interopRequireDefault(_Styled);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var styles = function styles(_ref) {
	var color = _ref.color,
	    fontSize = _ref.fontSize,
	    fontFamily = _ref.fontFamily,
	    space = _ref.space;
	return {
		root: {
			marginBottom: space[6],
			fontSize: fontSize.text,
			'&:hover $isolatedLink': {
				isolate: false,
				opacity: 1
			}
		},
		header: {
			position: 'relative',
			marginBottom: space[3]
		},
		isolatedLink: {
			position: 'absolute',
			top: '-1.8rem',
			right: 0,
			fontFamily: fontFamily.base,
			fontSize: fontSize.base,
			opacity: 0,
			transition: 'opacity ease-in-out .15s .2s'
		},
		primaryHeading: {
			color: color.base,
			position: 'relative',
			marginTop: 0,
			marginBottom: space[1],
			fontFamily: fontFamily.base,
			fontSize: fontSize.h2,
			fontWeight: 'normal'
		},
		heading: {
			color: color.base,
			margin: [[0, 0, space[1]]],
			fontFamily: fontFamily.base,
			fontSize: fontSize.h4,
			fontWeight: 'normal'
		},
		pathLine: {
			fontFamily: fontFamily.monospace,
			color: color.light,
			fontSize: fontSize.small
		},
		description: {
			color: color.base,
			marginBottom: space[3],
			fontSize: fontSize.text
		},
		subsection: {
			marginBottom: space[4]
		},
		isDeprecated: {
			textDecoration: 'line-through',
			color: color.light
		}
	};
};

function ReactComponentRenderer(_ref2) {
	var classes = _ref2.classes,
	    name = _ref2.name,
	    slug = _ref2.slug,
	    pathLine = _ref2.pathLine,
	    description = _ref2.description,
	    props = _ref2.props,
	    methods = _ref2.methods,
	    tags = _ref2.tags,
	    examples = _ref2.examples,
	    _ref2$isolated = _ref2.isolated,
	    isolated = _ref2$isolated === undefined ? false : _ref2$isolated;

	var headingClasses = (0, _classnames2.default)(classes.primaryHeading, _defineProperty({}, classes.isDeprecated, tags.deprecated));
	return _react2.default.createElement(
		'div',
		{ className: (0, _classnames2.default)(classes.root, 'component-section'), id: name + '-container' },
		_react2.default.createElement(
			'div',
			{ className: 'component-wrapper' },
			_react2.default.createElement(
				'header',
				{ className: classes.header },
				_react2.default.createElement(
					_Heading2.default,
					{ level: 2, className: headingClasses, slug: slug },
					name
				),
				_react2.default.createElement(
					'div',
					{ className: classes.pathLine },
					pathLine
				),
				_react2.default.createElement(
					'div',
					{ className: (0, _classnames2.default)(classes.isolatedLink, 'isolatedLink') },
					isolated ? _react2.default.createElement(
						_Link2.default,
						{ href: '/' },
						'\u2190 Back'
					) : _react2.default.createElement(
						_Link2.default,
						{ href: '#!/' + name },
						'Open isolated \u21E2'
					)
				)
			),
			_react2.default.createElement(
				'div',
				{ className: classes.description },
				description && _react2.default.createElement(_Markdown2.default, { text: description }),
				_react2.default.createElement(_JsDoc2.default, tags)
			),
			props && _react2.default.createElement(
				'div',
				{ className: classes.subsection },
				_react2.default.createElement(
					'h3',
					{ className: classes.heading },
					'Props'
				),
				props
			),
			methods && _react2.default.createElement(
				'div',
				{ className: classes.subsection },
				_react2.default.createElement(
					'h3',
					{ className: classes.heading },
					'Methods'
				),
				methods
			),
			examples
		)
	);
}

ReactComponentRenderer.propTypes = {
	classes: _propTypes2.default.object.isRequired,
	tags: _propTypes2.default.object,
	name: _propTypes2.default.string.isRequired,
	slug: _propTypes2.default.string.isRequired,
	pathLine: _propTypes2.default.string.isRequired,
	description: _propTypes2.default.string,
	props: _propTypes2.default.node,
	methods: _propTypes2.default.node,
	examples: _propTypes2.default.node,
	isolated: _propTypes2.default.bool,
	metadata: _propTypes2.default.object.isRequired
};

ReactComponentRenderer.defaultProps = {
	tags: {}
};

exports.default = (0, _Styled2.default)(styles)(ReactComponentRenderer);