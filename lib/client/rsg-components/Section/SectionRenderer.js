import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.function.name";
import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';
import SectionHeading from 'rsg-components/SectionHeading';
import Markdown from 'rsg-components/Markdown';

var styles = function styles(_ref) {
  var space = _ref.space;
  return {
    root: {
      marginBottom: space[4]
    }
  };
};

export var SectionRenderer = function SectionRenderer(allProps) {
  var classes = allProps.classes,
      name = allProps.name,
      slug = allProps.slug,
      content = allProps.content,
      components = allProps.components,
      sections = allProps.sections,
      depth = allProps.depth,
      description = allProps.description,
      pagePerSection = allProps.pagePerSection;
  return /*#__PURE__*/React.createElement("section", {
    className: classes.root,
    "data-testid": "section-" + slug
  }, name && /*#__PURE__*/React.createElement(SectionHeading, {
    depth: depth,
    id: slug,
    slotName: "sectionToolbar",
    pagePerSection: pagePerSection,
    slotProps: allProps
  }, name), description && /*#__PURE__*/React.createElement(Markdown, {
    text: description
  }), content, sections, components);
};
SectionRenderer.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
  name: PropTypes.string,
  description: PropTypes.string,
  slug: PropTypes.string.isRequired,
  content: PropTypes.node,
  components: PropTypes.node,
  sections: PropTypes.node,
  isolated: PropTypes.bool,
  depth: PropTypes.number.isRequired,
  pagePerSection: PropTypes.bool
};
export default Styled(styles)(SectionRenderer);