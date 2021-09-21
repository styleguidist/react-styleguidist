import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.array.filter";
import "core-js/modules/es.array.join";
import "core-js/modules/es.array.map";
import React from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import Markdown from 'rsg-components/Markdown';

var plural = function plural(array, caption) {
  return array.length === 1 ? caption : caption + "s";
};

var list = function list(array) {
  return array.map(function (item) {
    return item.description;
  }).join(', ');
};

var paragraphs = function paragraphs(array) {
  return array.map(function (item) {
    return item.description;
  }).join('\n\n');
};

var fields = {
  deprecated: function deprecated(value) {
    return "**Deprecated:** " + value[0].description;
  },
  see: function see(value) {
    return paragraphs(value);
  },
  link: function link(value) {
    return paragraphs(value);
  },
  author: function author(value) {
    return plural(value, 'Author') + ": " + list(value);
  },
  version: function version(value) {
    return "Version: " + value[0].description;
  },
  since: function since(value) {
    return "Since: " + value[0].description;
  }
};
export function getMarkdown(props) {
  return map(fields, function (format, field) {
    var tag = props[field];
    return tag && format(tag);
  }).filter(Boolean).join('\n\n');
}
export default function JsDoc(props) {
  var markdown = getMarkdown(props);
  return markdown ? /*#__PURE__*/React.createElement(Markdown, {
    text: markdown
  }) : null;
}
JsDoc.propTypes = {
  deprecated: PropTypes.array,
  see: PropTypes.array,
  link: PropTypes.array,
  author: PropTypes.array,
  version: PropTypes.array,
  since: PropTypes.array
};