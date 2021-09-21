import "core-js/modules/es.array.filter";
import React from 'react';
import PropTypes from 'prop-types';
import ComponentsListRenderer from 'rsg-components/ComponentsList/ComponentsListRenderer';

var ComponentsList = function ComponentsList(_ref) {
  var items = _ref.items;
  var visibleItems = items.filter(function (item) {
    return item.visibleName;
  });
  return visibleItems.length > 0 ? /*#__PURE__*/React.createElement(ComponentsListRenderer, {
    items: visibleItems
  }) : null;
};

ComponentsList.propTypes = {
  items: PropTypes.array.isRequired
};
export default ComponentsList;