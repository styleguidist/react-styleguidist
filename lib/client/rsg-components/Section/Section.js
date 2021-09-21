import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.function.name";
import React from 'react';
import PropTypes from 'prop-types';
import Examples from 'rsg-components/Examples';
import Components from 'rsg-components/Components';
import Sections from 'rsg-components/Sections';
import SectionRenderer from 'rsg-components/Section/SectionRenderer';
import { useStyleGuideContext } from 'rsg-components/Context';
import { DisplayModes } from '../../consts';

var Section = function Section(_ref) {
  var section = _ref.section,
      depth = _ref.depth;

  var _useStyleGuideContext = useStyleGuideContext(),
      displayMode = _useStyleGuideContext.displayMode,
      pagePerSection = _useStyleGuideContext.config.pagePerSection;

  var name = section.name,
      slug = section.slug,
      filepath = section.filepath,
      content = section.content,
      components = section.components,
      sections = section.sections,
      description = section.description,
      exampleMode = section.exampleMode,
      usageMode = section.usageMode;
  var contentJsx = Array.isArray(content) ? /*#__PURE__*/React.createElement(Examples, {
    examples: content,
    name: name,
    exampleMode: exampleMode
  }) : null;
  var componentsJsx = components && /*#__PURE__*/React.createElement(Components, {
    usageMode: usageMode,
    exampleMode: exampleMode,
    components: components,
    depth: depth + 1
  });
  var sectionsJsx = sections && /*#__PURE__*/React.createElement(Sections, {
    sections: sections,
    depth: depth + 1
  });
  return /*#__PURE__*/React.createElement(SectionRenderer, {
    description: description,
    pagePerSection: pagePerSection,
    name: name,
    slug: slug,
    filepath: filepath,
    content: contentJsx,
    components: componentsJsx,
    sections: sectionsJsx,
    isolated: displayMode !== DisplayModes.all,
    depth: depth
  });
};

Section.propTypes = {
  section: PropTypes.any.isRequired,
  depth: PropTypes.number.isRequired
};
export default Section;