import "core-js/modules/es.array.index-of";
import "core-js/modules/es.object.assign";
import "core-js/modules/es.object.keys";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import PropTypes from 'prop-types';
import Slot from 'rsg-components/Slot';
import SectionHeadingRenderer from 'rsg-components/SectionHeading/SectionHeadingRenderer';

var SectionHeading = function SectionHeading(_ref) {
  var slotName = _ref.slotName,
      slotProps = _ref.slotProps,
      children = _ref.children,
      id = _ref.id,
      href = _ref.href,
      rest = _objectWithoutPropertiesLoose(_ref, ["slotName", "slotProps", "children", "id", "href"]);

  return /*#__PURE__*/React.createElement(SectionHeadingRenderer, _extends({
    toolbar: /*#__PURE__*/React.createElement(Slot, {
      name: slotName,
      props: slotProps
    }),
    id: id,
    href: href
  }, rest), children);
};

SectionHeading.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string.isRequired,
  slotName: PropTypes.string.isRequired,
  slotProps: PropTypes.any.isRequired,
  depth: PropTypes.number.isRequired,
  deprecated: PropTypes.bool,
  pagePerSection: PropTypes.bool
};
export default SectionHeading;