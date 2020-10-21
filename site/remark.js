const visit = require('unist-util-visit');
const { kebabCase } = require('lodash');

const IGNORES = [
	'https://raw.githubusercontent.com/styleguidist/react-styleguidist/master/templates/DefaultExample.md',
	'https://github.com/styleguidist/react-styleguidist/blob/master/.github/Contributing.md',
];
const REPLACEMENTS = {
	'https://github.com/styleguidist/react-styleguidist': 'https://react-styleguidist.js.org/',
};

const getDocUrl = (url) => url.replace(/(\w+)(?:\.md)/, (_, $1) => `/docs/${kebabCase($1)}`);

/*
 * Fix links:
 * GettingStarted.md -> /docs/getting-started
 */
function link() {
	return (ast) =>
		visit(ast, 'link', (node) => {
			if (IGNORES.includes(node.url)) {
				return;
			}
			if (REPLACEMENTS[node.url]) {
				node.url = REPLACEMENTS[node.url];
			} else if (node.url.endsWith('.md') || node.url.includes('.md#')) {
				node.url = getDocUrl(node.url);
			}
		});
}

module.exports = [link];
