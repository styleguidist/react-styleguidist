import "core-js/modules/es.array.join";
import "core-js/modules/es.array.map";
import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'rsg-components/Markdown';
import Styled from 'rsg-components/Styled';
import { DOCS_COMPONENTS } from '../../../scripts/consts';

var styles = function styles(_ref) {
  var space = _ref.space,
      maxWidth = _ref.maxWidth;
  return {
    root: {
      maxWidth: maxWidth,
      margin: [[0, 'auto']],
      padding: space[4]
    }
  };
};

export var WelcomeRenderer = function WelcomeRenderer(_ref2) {
  var classes = _ref2.classes,
      patterns = _ref2.patterns;
  return /*#__PURE__*/React.createElement("div", {
    className: classes.root
  }, /*#__PURE__*/React.createElement(Markdown, {
    text: "\n# Welcome to React Styleguidist!\n\n**We couldn\u2019t find any components** using these patterns:\n\n" + patterns.map(function (p) {
      return "- `" + p + "`";
    }).join('\n') + "\n\nCreate **styleguide.config.js** file in your project root directory like this:\n\n    module.exports = {\n      components: 'src/components/**/*.js'\n    };\n\nRead more in the [locating components guide](" + DOCS_COMPONENTS + ").\n\t\t\t\t"
  }));
};
WelcomeRenderer.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
  patterns: PropTypes.array.isRequired
};
export default Styled(styles)(WelcomeRenderer);