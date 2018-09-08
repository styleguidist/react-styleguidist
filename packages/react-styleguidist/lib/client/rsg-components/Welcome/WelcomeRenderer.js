import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'rsg-components/Markdown';
import Styled from 'rsg-components/Styled';
import { DOCS_COMPONENTS } from '../../../scripts/consts';

const styles = function styles(_ref) {
  const space = _ref.space;

      
const maxWidth = _ref.maxWidth;
  return {
    root: {
      maxWidth,
      margin: [[0, 'auto']],
      padding: space[4]
    }
  };
};

export function WelcomeRenderer(_ref2) {
  const classes = _ref2.classes;

      
const patterns = _ref2.patterns;
  return React.createElement("div", {
    className: classes.root
  }, React.createElement(Markdown, {
    text: "\n# Welcome to React Styleguidist!\n\n**We couldn\u2019t find any components** using these patterns:\n\n".concat(patterns.map(function (p) {
      return "- `".concat(p, "`");
    }).join('\n'), "\n\nCreate **styleguide.config.js** file in your project root directory like this:\n\n    module.exports = {\n      components: 'src/components/**/*.js'\n    };\n\nRead more in the [locating components guide](").concat(DOCS_COMPONENTS, ").\n\t\t\t\t")
  }));
}
WelcomeRenderer.propTypes = {
  classes: PropTypes.object.isRequired,
  patterns: PropTypes.array.isRequired
};
export default Styled(styles)(WelcomeRenderer);