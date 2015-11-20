/**
 * Customized markdown-it renderer that renders only code blocks.
 */

var MarkdownIt = require('markdown-it');

// Custom preset
var preset = {
	options: {
		html: false,
		xhtmlOut: false,
		breaks: false,
		linkify: false,
		typographer: false,
		highlight: null,
		maxNesting: 20
	},
	components: {
		core: {
			rules: [
				'normalize',
				'block',
				'inline'
			]
		},
		block: {
			rules: [
				'code',
				'fence',
				'paragraph'
			]
		},
		inline: {
			rules: [
				'backticks',
				'text'
			],
			rules2: [
				'balance_pairs',
				'text_collapse'
			]
		}
	}
};

// Copy pasted from markdown-it but prints \n instead of <p> tags and do not render inline `code` blocks
function render(tokens, options, env) {
	var result = '';
	var rules = this.rules;

	for (var i = 0, len = tokens.length; i < len; i++) {
		var type = tokens[i].type;

		// Revert inline code blocks
		if (type === 'inline') {
			tokens[i].children = tokens[i].children.map(function(child) {
				if (child.type === 'code_inline') {
					child.type = 'text';
					child.tag = '';
					child.markup = '';
					child.content = '`' + child.content + '`';
				}
				return child;
			});
		}

		if (type === 'paragraph_open' || type === 'paragraph_close') {
			result += '\n';
		}
		else if (type === 'inline') {
			result += this.renderInline(tokens[i].children, options, env);
		}
		else if (typeof rules[type] !== 'undefined') {
			result += rules[tokens[i].type](tokens, i, options, env, this);
		}
		else {
			result += this.renderToken(tokens, i, options, env);
		}
	}

	return result;
}

module.exports = function() {
	var md = new MarkdownIt();
	md.configure(preset);
	md.renderer.render = render;
	return md;
};
