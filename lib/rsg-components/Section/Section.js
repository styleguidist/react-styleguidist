'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = Section;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Examples = require('rsg-components/Examples');

var _Examples2 = _interopRequireDefault(_Examples);

var _Components = require('rsg-components/Components');

var _Components2 = _interopRequireDefault(_Components);

var _Sections = require('rsg-components/Sections');

var _Sections2 = _interopRequireDefault(_Sections);

var _SectionRenderer = require('rsg-components/Section/SectionRenderer');

var _SectionRenderer2 = _interopRequireDefault(_SectionRenderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Section(_ref, _ref2) {
	var section = _ref.section;
	var _ref2$isolatedSection = _ref2.isolatedSection,
	    isolatedSection = _ref2$isolatedSection === undefined ? false : _ref2$isolatedSection;
	var name = section.name,
	    slug = section.slug,
	    content = section.content,
	    components = section.components,
	    sections = section.sections;


	var contentJsx = content && _react2.default.createElement(_Examples2.default, { examples: content });
	var componentsJsx = components && _react2.default.createElement(_Components2.default, { components: components });
	var sectionsJsx = sections && _react2.default.createElement(_Sections2.default, { sections: sections });

	return _react2.default.createElement(_SectionRenderer2.default, {
		name: name,
		slug: slug,
		content: contentJsx,
		components: componentsJsx,
		sections: sectionsJsx,
		isolatedSection: isolatedSection
	});
}

Section.propTypes = {
	section: _propTypes2.default.object.isRequired
};

Section.contextTypes = {
	isolatedSection: _propTypes2.default.bool
};