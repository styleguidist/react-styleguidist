import "core-js/modules/es.array.map";
import "core-js/modules/es.function.name";
import React from 'react';
import PropTypes from 'prop-types';
import Playground from 'rsg-components/Playground';
import Markdown from 'rsg-components/Markdown';
import ExamplesRenderer from 'rsg-components/Examples/ExamplesRenderer';
import { useStyleGuideContext } from 'rsg-components/Context';

var Examples = function Examples(_ref) {
  var examples = _ref.examples,
      name = _ref.name,
      exampleMode = _ref.exampleMode;

  var _useStyleGuideContext = useStyleGuideContext(),
      codeRevision = _useStyleGuideContext.codeRevision;

  return /*#__PURE__*/React.createElement(ExamplesRenderer, {
    name: name
  }, examples.map(function (example, index) {
    switch (example.type) {
      case 'code':
        return /*#__PURE__*/React.createElement(Playground, {
          code: example.content,
          evalInContext: example.evalInContext,
          key: codeRevision + "/" + index,
          name: name,
          index: index,
          settings: example.settings,
          exampleMode: exampleMode
        });

      case 'markdown':
        return /*#__PURE__*/React.createElement(Markdown, {
          text: example.content,
          key: index
        });

      default:
        return null;
    }
  }));
};

Examples.propTypes = {
  examples: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  exampleMode: PropTypes.string.isRequired
};
export default Examples;