'use strict';

const remark = require('remark');
const visit = require('unist-util-visit');
const hljs = require('highlight.js');

const CODE_PLACEHOLDER = '<%{#code#}%>';

function keysToLowerCaseDeep(obj) {
	const newobj = {};
	Object.keys(obj).forEach(key => {
		newobj[key.toLowerCase()] = typeof obj[key] === 'object'
			? keysToLowerCaseDeep(obj[key])
			: obj[key];
	});
	return newobj;
}

/**
 * Separate Markdown and code examples that should be rendered as a playground in a style guide.
 *
 * @param {string} markdown
 * @param {Function} examplePreprocessor
 * @returns {Array}
 */
module.exports = function chunkify(markdown, examplePreprocessor) {
	const codeChunks = [];
	const codeLanguages = ['javascript', 'js', 'jsx'];
	/*
	 * - Highlight code in fenced code blocks with defined language (```html).
	 * - Extract indented and fenced code blocks with lang javascript | js | jsx or if lang is not defined.
	 * - Leave all other Markdown or HTML as is.
	 */
	function processCode() {
		return ast => {
			visit(ast, 'code', node => {
				let lang = node.lang || '';
				let settings = {};
				let content = node.value;

				const startSettingsString = lang.indexOf(' ');
				if (startSettingsString !== -1) {
					const settingsString = lang.slice(startSettingsString + 1);
					try {
						settings = JSON.parse(settingsString);
					} catch (exception) {
						const settingsModifiers = settingsString.split(' ');
						if (settingsModifiers.length > 0) {
							settingsModifiers.forEach(modifier => {
								settings[modifier] = true;
							});
						} else {
							node.value = `Settings not parsed! Use single settings modifiers or JSON to pass settings!
								\`\`\`jsx static noEditor
									...
								\`\`\`
								or 
								\`\`\`jsx { "static": true }
									...
								\`\`\`
							`;
						}
					}
				}

				lang = lang.slice(0, lang.indexOf(' ') !== -1 ? lang.indexOf(' ') : lang.length);
				if (examplePreprocessor) {
					const processedExample = examplePreprocessor({ content, lang, settings });
					content = processedExample.content;
					lang = processedExample.lang;
					settings = processedExample.settings;
				}
				settings = keysToLowerCaseDeep(settings);
				node.lang = lang;
				if (lang && (codeLanguages.indexOf(lang) === -1 || (settings && settings.static))) {
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
						content,
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
