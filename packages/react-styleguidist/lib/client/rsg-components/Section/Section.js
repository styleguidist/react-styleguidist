import "core-js/modules/es6.function.name";
import React from 'react';
import PropTypes from 'prop-types';
import Examples from 'rsg-components/Examples';
import Components from 'rsg-components/Components';
import Sections from 'rsg-components/Sections';
import SectionRenderer from 'rsg-components/Section/SectionRenderer';
import { DisplayModes } from '../../consts';

export default function Section(_ref, _ref2) {
  const section = _ref.section;

      
const depth = _ref.depth;
  const displayMode = _ref2.displayMode;

      
const pagePerSection = _ref2.config.pagePerSection;
  const name = section.name;

      
const slug = section.slug;

      
const filepath = section.filepath;

      
const content = section.content;

      
const components = section.components;

      
const sections = section.sections;

      
const description = section.description;

      
const exampleMode = section.exampleMode;

      
const usageMode = section.usageMode;
  const contentJsx = content && React.createElement(Examples, {
    examples: content,
    name,
    exampleMode
  });
  const componentsJsx = components && React.createElement(Components, {
    usageMode,
    exampleMode,
    components,
    depth: depth + 1
  });
  const sectionsJsx = sections && React.createElement(Sections, {
    sections,
    depth: depth + 1
  });
  return React.createElement(SectionRenderer, {
    description,
    pagePerSection,
    name,
    slug,
    filepath,
    content: contentJsx,
    components: componentsJsx,
    sections: sectionsJsx,
    isolated: displayMode !== DisplayModes.all,
    depth
  });
}
Section.propTypes = {
  section: PropTypes.object.isRequired,
  depth: PropTypes.number.isRequired
};
Section.contextTypes = {
  displayMode: PropTypes.string,
  config: PropTypes.object.isRequired
};