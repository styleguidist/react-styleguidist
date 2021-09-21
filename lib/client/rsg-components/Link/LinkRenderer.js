import "core-js/modules/es.array.index-of";
import "core-js/modules/es.object.assign";
import "core-js/modules/es.object.keys";
import "core-js/modules/es.string.link";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'clsx';
import Styled from 'rsg-components/Styled';

var styles = function styles(_ref) {
  var color = _ref.color;
  return {
    link: {
      '&, &:link, &:visited': {
        fontSize: 'inherit',
        color: color.link,
        textDecoration: 'none'
      },
      '&:hover, &:active': {
        isolate: false,
        color: color.linkHover,
        cursor: 'pointer'
      }
    }
  };
};

export var LinkRenderer = function LinkRenderer(_ref2) {
  var classes = _ref2.classes,
      children = _ref2.children,
      props = _objectWithoutPropertiesLoose(_ref2, ["classes", "children"]);

  return /*#__PURE__*/React.createElement("a", _extends({}, props, {
    className: cx(classes.link, props.className)
  }), children);
};
LinkRenderer.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
  href: PropTypes.string
};
export default Styled(styles)(LinkRenderer);