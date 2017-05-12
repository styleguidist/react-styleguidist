'use strict';

const remark = require('remark');
const visit = require('unist-util-visit');
const hljs = require('highlight.js');

function highlight() {
	return ast => {
		visit(ast, 'code', node => {
			let highlighted;
			try {
				if (node.lang) {
					highlighted = hljs.highlight(node.lang, node.value).value;
				} else {
					highlighted = hljs.highlightAuto(node.value).value;
				}
			} catch (exception) {
				highlighted = exception.message;
			}
			node.value = highlighted;
		});
	};
}

/**
 * Highlight code in code snippets in Markdown.
 *
 * @param {string} markdown
 * @returns {string}
 */
module.exports = function highlightCode(markdown) {
	return remark().use(highlight).processSync(markdown).toString();
};
