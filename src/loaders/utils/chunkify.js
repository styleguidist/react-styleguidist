import remark from 'remark';
import visit from 'unist-util-visit';
import highlightCode from './highlightCode';
import parseExample from './parseExample';

const PLAYGROUND_LANGS = ['javascript', 'js', 'jsx'];
const CODE_PLACEHOLDER = '<%{#code#}%>';

/**
 * Separate Markdown and code examples that should be rendered as a playground in a style guide.
 *
 * @param {string} markdown
 * @param {Function} updateExample
 * @param {Array<string>} playgroundLangs
 * @returns {Array}
 */
export default function chunkify(markdown, updateExample, playgroundLangs = PLAYGROUND_LANGS) {
	const codeChunks = [];

	/*
	 * - Highlight code in fenced code blocks with defined language (```html).
	 * - Extract indented and fenced code blocks with lang javascript|js|jsx or if lang is not defined.
	 * - Leave all other Markdown or HTML as is.
	 */
	function processCode() {
		return ast => {
			visit(ast, 'code', node => {
				const example = parseExample(node.value, node.lang, node.meta, updateExample);

				if (example.error) {
					node.lang = undefined;
					node.value = example.error;
					return;
				}

				const lang = example.lang;
				node.lang = lang;
				if (!lang || (playgroundLangs.indexOf(lang) !== -1 && !example.settings.static)) {
					codeChunks.push({
						type: 'code',
						content: example.content,
						settings: example.settings,
					});
					node.type = 'html';
					node.value = CODE_PLACEHOLDER;
				} else {
					node.meta = null;
					node.value = highlightCode(example.content, lang);
				}
			});
		};
	}

	const rendered = remark()
		.use(processCode)
		.processSync(markdown)
		.toString();

	const chunks = [];
	const textChunks = rendered.split(CODE_PLACEHOLDER);
	textChunks.forEach(chunk => {
		chunk = chunk.trim();
		if (chunk) {
			chunks.push({
				type: 'markdown',
				content: chunk,
			});
		}
		const code = codeChunks.shift();
		if (code) {
			chunks.push(code);
		}
	});

	return chunks;
}
