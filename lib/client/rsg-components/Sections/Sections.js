import "core-js/modules/es.array.filter";
import "core-js/modules/es.array.map";
import React from 'react';
import PropTypes from 'prop-types';
import Section from 'rsg-components/Section';
import SectionsRenderer from 'rsg-components/Sections/SectionsRenderer';

var Sections = function Sections(_ref) {
  var sections = _ref.sections,
      depth = _ref.depth;
  return /*#__PURE__*/React.createElement(SectionsRenderer, null, sections.filter(function (section) {
    return !section.externalLink;
  }).map(function (section, idx) {
    return /*#__PURE__*/React.createElement(Section, {
      key: idx,
      section: section,
      depth: depth
    });
  }));
};

Sections.propTypes = {
  sections: PropTypes.array.isRequired,
  depth: PropTypes.number.isRequired,
  root: PropTypes.bool
};
export default Sections;