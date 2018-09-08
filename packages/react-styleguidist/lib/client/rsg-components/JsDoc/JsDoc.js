import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'rsg-components/Markdown';
import map from 'lodash/map';

const plural = function plural(array, caption) {
  return array.length === 1 ? caption : "".concat(caption, "s");
};

const list = function list(array) {
  return array.map(function (item) {
    return item.description;
  }).join(', ');
};

const paragraphs = function paragraphs(array) {
  return array.map(function (item) {
    return item.description;
  }).join('\n\n');
};

const fields = {
  deprecated: function deprecated(value) {
    return "**Deprecated:** ".concat(value[0].description);
  },
  see: function see(value) {
    return paragraphs(value);
  },
  link: function link(value) {
    return paragraphs(value);
  },
  author: function author(value) {
    return "".concat(plural(value, 'Author'), ": ").concat(list(value));
  },
  version: function version(value) {
    return "Version: ".concat(value[0].description);
  },
  since: function since(value) {
    return "Since: ".concat(value[0].description);
  }
};
export function getMarkdown(props) {
  return map(fields, function (format, field) {
    return props[field] && format(props[field]);
  }).filter(Boolean).join('\n\n');
}
export default function JsDoc(props) {
  const markdown = getMarkdown(props);
  return markdown ? React.createElement(Markdown, {
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