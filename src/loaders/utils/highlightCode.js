const logger = require('glogg')('rsg');
const Prism = require('prismjs/components/prism-core');
require('prismjs/components/prism-clike');
require('prismjs/components/prism-markup');
require('prismjs/components/prism-markdown');
require('prismjs/components/prism-css');
require('prismjs/components/prism-css-extras');
require('prismjs/components/prism-scss');
require('prismjs/components/prism-javascript');
require('prismjs/components/prism-flow');
require('prismjs/components/prism-typescript');
require('prismjs/components/prism-jsx');
require('prismjs/components/prism-tsx');
require('prismjs/components/prism-graphql');
require('prismjs/components/prism-json');
require('prismjs/components/prism-bash');
require('prismjs/components/prism-diff');

const IGNORED_LANGUAGES = ['extend', 'insertBefore', 'DFS'];
const getLanguages = () => Object.keys(Prism.languages).filter(x => !IGNORED_LANGUAGES.includes(x));

/**
 * Highlight code.
 *
 * @param {string} code
 * @param {string} lang
 * @returns {string}
 */
module.exports = function highlightCode(code, lang) {
	if (!lang) {
		return code;
	}

	const grammar = Prism.languages[lang];
	if (!grammar) {
		logger.warn(
			`Syntax highlighting for “${lang}” isn’t supported. Supported languages are: ${getLanguages().join(
				', '
			)}.`
		);
		return code;
	}

	return Prism.highlight(code, grammar, lang);
};
