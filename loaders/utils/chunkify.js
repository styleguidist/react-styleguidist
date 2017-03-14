'use strict';

const remark = require('remark');
const visit = require('unist-util-visit');
const hljs = require('highlight.js');

const CODE_PLACEHOLDER = '<%{#code#}%>';

/**
 * Separate Markdown and code examples that should be rendered as a playground in a style guide.
 *
 * @param {string} markdown
 * @param {Object} opts     additional options (section)
 * @returns {Array}
 */
module.exports = function chunkify(markdown, opts) {
	const codeChunks = [];
	opts = opts || {};

	/*
	 * - Highlight code in fenced code blocks with defined language (```html) if the language is not `example`.
	 * - Extract indented and fenced code blocks without language or if language is `example`.
	 * - Leave all other Markdown or HTML as is.
	 */
	function processCode() {
		return (ast) => {
			visit(ast, 'code', node => {
				if (node.lang && node.lang !== 'example') {
					let highlighted;
					try {
						highlighted = hljs.highlight(node.lang, node.value).value;
					}
					catch (exception) {
						highlighted = exception.message;
					}
					node.value = highlighted;
				}
				else {
					codeChunks.push(node.value);
					node.type = 'html';
					node.value = CODE_PLACEHOLDER;
				}
			});
		};
	}

	/*
	 * If a section was provided with the @example doclet, this will return only the markdown AST for that section.
	 * Sections are defined by top level headings. If specifying a section, the original section heading will NOT
	 * be included in the returned markdown.
	 */
	const filterSection = section => () => ast => {
		if (!section) {
			return;
		}

		let lastHeadingPosition = Infinity;

		visit(ast, 'heading', (node, position, parent) => {
			if (node.depth === 1 && node.children[0].value.trim().toLowerCase() === section.toLowerCase()) {
				const positionAfterHeading = position + 1; // we don't want to include the original heading

				const contentAfterHeading = parent.children.slice(positionAfterHeading, lastHeadingPosition);
				parent.children = contentAfterHeading;
			}

			lastHeadingPosition = position;
		}, true);
	};

	const rendered = remark()
		.use(filterSection(opts.section))
		.use(processCode)
		.process(markdown)
		.contents
	;

	const chunks = [];
	const textChunks = rendered.split(CODE_PLACEHOLDER);
	textChunks.forEach(chunk => {
		if (chunk) {
			chunks.push({
				type: 'markdown',
				content: chunk,
			});
		}
		const code = codeChunks.shift();
		if (code) {
			chunks.push({
				type: 'code',
				content: code,
			});
		}
	});

	return chunks;
};
