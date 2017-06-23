'use strict';

const remark = require('remark');
const visit = require('unist-util-visit');
const hljs = require('highlight.js');

const CODE_PLACEHOLDER = '<%{#code#}%>';

/**
 * Separate Markdown and code examples that should be rendered as a playground in a style guide.
 *
 * @param {string} markdown
 * @returns {Array}
 */
module.exports = function chunkify(markdown) {
	const codeChunks = [];
	const codeLanguages = ['javascript', 'js', 'jsx'];

	/*
	 * - Highlight code in fenced code blocks with defined language (```html) if the language is not `example`.
	 * - Extract indented and fenced code blocks with lang javascript | js | jsx or if language is `example`.
	 * - Leave all other Markdown or HTML as is.
	 */
	function processCode() {
		return ast => {
			visit(ast, 'code', node => {
				let lang = node.lang || '';
				let settings;
				try {
					const settingsString = lang.slice(lang.indexOf('{'), lang.lastIndexOf('}') + 1) || '{}';
					settings = JSON.parse(settingsString);
				} catch (exception) {
					node.value = `Settings not parsed! Use JSON to pass settings!
						\`\`\`jsx // { "static": false }
							...
						\`\`\`
					`;
				}
				lang = lang.slice(0, lang.indexOf(' ') !== -1 ? lang.indexOf(' ') : lang.length);
				node.lang = lang;
				if (
					lang &&
					lang !== 'example' &&
					(codeLanguages.indexOf(lang) === -1 || (settings && settings.static))
				) {
					let highlighted;
					try {
						highlighted = hljs.highlight(node.lang, node.value).value;
					} catch (exception) {
						highlighted = exception.message;
					}
					node.value = highlighted;
				} else {
					codeChunks.push({
						type: 'code',
						content: node.value,
						settings,
					});
					node.type = 'html';
					node.value = CODE_PLACEHOLDER;
				}
			});
		};
	}

	const rendered = remark().use(processCode).processSync(markdown).toString();

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
};
