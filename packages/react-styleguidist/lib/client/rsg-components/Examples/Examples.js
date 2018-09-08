import "core-js/modules/es6.function.name";
import React from 'react';
import PropTypes from 'prop-types';
import Playground from 'rsg-components/Playground';
import Markdown from 'rsg-components/Markdown';
import ExamplesRenderer from 'rsg-components/Examples/ExamplesRenderer';

export default function Examples(_ref, _ref2) {
  const examples = _ref.examples;

      
const name = _ref.name;

      
const exampleMode = _ref.exampleMode;
  const codeRevision = _ref2.codeRevision;
  return React.createElement(ExamplesRenderer, null, examples.map(function (example, index) {
    switch (example.type) {
      case 'code':
        return React.createElement(Playground, {
          code: example.content,
          evalInContext: example.evalInContext,
          key: "".concat(codeRevision, "/").concat(index),
          name,
          index,
          settings: example.settings,
          exampleMode
        });

      case 'markdown':
        return React.createElement(Markdown, {
          text: example.content,
          key: index
        });

      default:
        return null;
    }
  }));
}
Examples.propTypes = {
  examples: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  exampleMode: PropTypes.string.isRequired
};
Examples.contextTypes = {
  codeRevision: PropTypes.number.isRequired
};