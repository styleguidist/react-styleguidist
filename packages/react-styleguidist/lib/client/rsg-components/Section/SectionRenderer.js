import "core-js/modules/es6.function.name";
import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';
import SectionHeading from 'rsg-components/SectionHeading';
import Markdown from 'rsg-components/Markdown';

const styles = function styles(_ref) {
  const space = _ref.space;
  return {
    root: {
      marginBottom: space[4]
    }
  };
};

export function SectionRenderer(allProps) {
  const classes = allProps.classes;

      
const name = allProps.name;

      
const slug = allProps.slug;

      
const content = allProps.content;

      
const components = allProps.components;

      
const sections = allProps.sections;

      
const depth = allProps.depth;

      
const description = allProps.description;

      
const pagePerSection = allProps.pagePerSection;
  return React.createElement("section", {
    className: classes.root
  }, name && React.createElement(SectionHeading, {
    depth,
    id: slug,
    slotName: "sectionToolbar",
    pagePerSection,
    slotProps: allProps
  }, name), description && React.createElement(Markdown, {
    text: description
  }), content, sections, components);
}
SectionRenderer.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string,
  description: PropTypes.string,
  slug: PropTypes.string,
  filepath: PropTypes.string,
  content: PropTypes.node,
  components: PropTypes.node,
  sections: PropTypes.node,
  isolated: PropTypes.bool,
  depth: PropTypes.number.isRequired,
  pagePerSection: PropTypes.bool
};
export default Styled(styles)(SectionRenderer);