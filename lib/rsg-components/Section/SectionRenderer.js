'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.SectionRenderer = SectionRenderer;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Styled = require('rsg-components/Styled');

var _Styled2 = _interopRequireDefault(_Styled);

var _Heading = require('rsg-components/Heading');

var _Heading2 = _interopRequireDefault(_Heading);

var _Link = require('rsg-components/Link');

var _Link2 = _interopRequireDefault(_Link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles(_ref) {
	var space = _ref.space,
	    fontFamily = _ref.fontFamily,
	    fontSize = _ref.fontSize;
	return {
		root: {
			marginBottom: space[4],
			'&:hover $isolatedLink': {
				isolate: false,
				opacity: 1
			}
		},
		heading: {
			margin: [[0, 0, space[2]]],
			fontFamily: fontFamily.base,
			fontSize: fontSize.h1
		},
		isolatedLink: {
			position: 'absolute',
			top: 0,
			right: 0,
			fontFamily: fontFamily.base,
			fontSize: fontSize.base,
			opacity: 0,
			transition: 'opacity ease-in-out .15s .2s'
		},
		titleWrapper: {
			position: 'relative'
		}
	};
};

function SectionRenderer(_ref2) {
	var classes = _ref2.classes,
	    name = _ref2.name,
	    slug = _ref2.slug,
	    content = _ref2.content,
	    components = _ref2.components,
	    sections = _ref2.sections,
	    isolatedSection = _ref2.isolatedSection;

	return _react2.default.createElement(
		'section',
		{ className: classes.root },
		_react2.default.createElement(
			'div',
			{ className: classes.titleWrapper },
			name && _react2.default.createElement(
				_Heading2.default,
				{ level: 1, slug: slug, className: classes.heading },
				name
			),
			_react2.default.createElement(
				'div',
				{ className: classes.isolatedLink },
				name && (isolatedSection ? _react2.default.createElement(
					_Link2.default,
					{ href: '/' },
					'\u21FD Back'
				) : _react2.default.createElement(
					_Link2.default,
					{ href: '#!/' + name },
					'Open isolated \u21E2'
				))
			)
		),
		content,
		components,
		sections
	);
}

SectionRenderer.propTypes = {
	classes: _propTypes2.default.object.isRequired,
	name: _propTypes2.default.string,
	slug: _propTypes2.default.string,
	content: _propTypes2.default.node,
	components: _propTypes2.default.node,
	sections: _propTypes2.default.node,
	isolatedSection: _propTypes2.default.bool
};

exports.default = (0, _Styled2.default)(styles)(SectionRenderer);