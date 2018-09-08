import "core-js/modules/es6.object.assign";
import "core-js/modules/web.dom.iterable";
import "core-js/modules/es6.array.iterator";
import "core-js/modules/es6.object.keys";

import React from 'react';
import PropTypes from 'prop-types';
import Slot from 'rsg-components/Slot';
import SectionHeadingRenderer from 'rsg-components/SectionHeading/SectionHeadingRenderer';
import getUrl from '../../utils/getUrl';

function _extends() { _extends = Object.assign || function (target) { for (let i = 1; i < arguments.length; i++) { const source = arguments[i]; for (const key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) {return {};} const target = _objectWithoutPropertiesLoose(source, excluded); let key; let i; if (Object.getOwnPropertySymbols) { const sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) {continue;} if (!Object.prototype.propertyIsEnumerable.call(source, key)) {continue;} target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) {return {};} const target = {}; const sourceKeys = Object.keys(source); let key; let i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) {continue;} target[key] = source[key]; } return target; }
export default function SectionHeading(_ref) {
  const slotName = _ref.slotName;

      
const slotProps = _ref.slotProps;

      
const children = _ref.children;

      
const id = _ref.id;

      
const pagePerSection = _ref.pagePerSection;

      
const rest = _objectWithoutProperties(_ref, ["slotName", "slotProps", "children", "id", "pagePerSection"]);

  const href = pagePerSection ? getUrl({
    slug: id,
    id: rest.depth !== 1,
    takeHash: true
  }) : getUrl({
    slug: id,
    anchor: true
  });
  return React.createElement(SectionHeadingRenderer, _extends({
    toolbar: React.createElement(Slot, {
      name: slotName,
      props: slotProps
    }),
    id,
    href
  }, rest), children);
}
SectionHeading.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string.isRequired,
  slotName: PropTypes.string.isRequired,
  slotProps: PropTypes.object.isRequired,
  depth: PropTypes.number.isRequired,
  deprecated: PropTypes.bool,
  pagePerSection: PropTypes.bool
};