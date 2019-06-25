const visit = require('unist-util-visit');

// Return a Remark AST link node's link text
const getLinkValue = node =>
	node.children.reduce((value, child) => {
		if (child.type === 'text') {
			value += child.value;
		}
		return value;
	}, '');

/**
 * Prevent printing URLs as auto links (<http://example.com>).
 * Remark prints all links without a text as auto links, so we're adding a URL
 * as a title. It has an unfortunate side effect: a link has a title of
 * "http&#x3A;//..."
 *
 * @return {Object}
 */
module.exports = function noAutoLinkRemarkPlugin() {
	return ast => {
		visit(ast, 'link', node => {
			const value = getLinkValue(node);

			if (value === node.url) {
				node.title = node.url;
			}
		});
	};
};
