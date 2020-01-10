import createLogger from 'glogg';
import * as Prism from 'prismjs';

import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-css-extras';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-less';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-flow';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-graphql';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-diff';

const logger = createLogger('rsg');

const IGNORED_LANGUAGES = ['extend', 'insertBefore', 'DFS'];
const getLanguages = () => Object.keys(Prism.languages).filter(x => !IGNORED_LANGUAGES.includes(x));

/**
 * Highlight code.
 *
 * @param {string} code
 * @param {string} lang
 * @returns {string}
 */
export default function highlightCode(code: string, lang?: string): string {
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
}
