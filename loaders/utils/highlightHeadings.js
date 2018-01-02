'use strict';

const remark = require('remark');
const visit = require('unist-util-visit');

/**
 * Extract md headings
 * @param markdown
 * @return {Array}
 */
module.exports = function highlightCodeInMarkdown(markdown) {
  const headings = [];
  remark()
    .use(() => {
      return ast => {
        visit(ast, 'heading', node => {
          headings.push({
            depth: node.depth,
            name: node.children[0].value,
          });
        });
      };
    })
    .processSync(markdown);
  return headings;
};
