'use strict';

const remark = require('remark');
const visit = require('unist-util-visit');
const highlightCode = require('./highlightCode');

function highlight() {
	return ast => {
		visit(ast, 'code', node => {
			node.value = highlightCode(node.value, node.lang);
		});
	};
}

/**
 * Highlight code in code snippets in Markdown.
 *
 * @param {string} markdown
 * @returns {string}
 */
module.exports = function highlightCodeInMarkdown(markdown) {
	return remark()
		.use(highlight)
		.processSync(markdown)
		.toString();
};
