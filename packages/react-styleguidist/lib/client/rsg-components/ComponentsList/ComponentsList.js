import "core-js/modules/web.dom.iterable";
import "core-js/modules/es6.array.iterator";
import "core-js/modules/es6.object.keys";
import "core-js/modules/es6.function.name";

import React from 'react';
import ComponentsListRenderer from 'rsg-components/ComponentsList/ComponentsListRenderer';
import PropTypes from 'prop-types';
import getUrl from '../../utils/getUrl';

function _objectSpread(target) { for (let i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; let ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function ComponentsList(_ref) {
  const classes = _ref.classes;

      
const items = _ref.items;

      
const _ref$useRouterLinks = _ref.useRouterLinks;

      
const useRouterLinks = _ref$useRouterLinks === void 0 ? false : _ref$useRouterLinks;

      
const useHashId = _ref.useHashId;

      
const hashPath = _ref.hashPath;
  const mappedItems = items.map(function (item) {
    return _objectSpread({}, item, {
      href: getUrl({
        name: item.name,
        slug: item.slug,
        anchor: !useRouterLinks,
        hashPath: useRouterLinks ? hashPath : false,
        id: useRouterLinks ? useHashId : false
      })
    });
  });
  return React.createElement(ComponentsListRenderer, {
    classes,
    items: mappedItems
  });
}

ComponentsList.propTypes = {
  items: PropTypes.array.isRequired,
  classes: PropTypes.object,
  hashPath: PropTypes.array,
  useRouterLinks: PropTypes.bool,
  useHashId: PropTypes.bool
};
export default ComponentsList;