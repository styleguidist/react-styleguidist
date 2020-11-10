import remark from 'remark';
import visit from 'unist-util-visit';
import highlightCode from './highlightCode';
import parseExample, { ExampleError } from './parseExample';
import * as Rsg from '../../typings';

const PLAYGROUND_LANGS = ['javascript', 'js', 'jsx', 'typescript', 'ts', 'tsx'];
const CODE_PLACEHOLDER = '<%{#code#}%>';

function isErrorExample(example: any): example is ExampleError {
	return !!example.error;
}

/**
 * Separate Markdown and code examples that should be rendered as a playground in a style guide.
 *
 * @param {string} markdown
 * @param {Function} updateExample
 * @param {Array<string>} playgroundLangs
 * @returns {Array}
 */
export default function chunkify(
	markdown: string,
	updateExample?: (example: Omit<Rsg.CodeExample, 'type'>) => Omit<Rsg.CodeExample, 'type'>,
	playgroundLangs = PLAYGROUND_LANGS
): (Rsg.CodeExample | Rsg.MarkdownExample)[] {
	const codeChunks: Rsg.CodeExample[] = [];

	/*
	 * - Highlight code in fenced code blocks with defined language (```html).
	 * - Extract indented and fenced code blocks with lang javascript|js|jsx or if lang is not defined.
	 * - Leave all other Markdown or HTML as is.
	 */
	function processCode() {
		return (ast: any) => {
			visit(ast, 'code', (node: any) => {
				const example = parseExample(node.value, node.lang, node.meta, updateExample);

				if (isErrorExample(example)) {
					node.lang = undefined;
					node.value = example.error;
					return;
				}

				const lang = example.lang;
				node.lang = lang;
				if (
					!lang ||
					(playgroundLangs.indexOf(lang) !== -1 && !(example.settings && example.settings.static))
				) {
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

	const rendered = remark().use(processCode).processSync(markdown).toString();

	const chunks: (Rsg.CodeExample | Rsg.MarkdownExample)[] = [];
	const textChunks = rendered.split(CODE_PLACEHOLDER);
	textChunks.forEach((chunk) => {
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
