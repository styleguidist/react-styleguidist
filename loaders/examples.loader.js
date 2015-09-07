var fs = require('fs');
var path = require('path');
var marked = require('marked');
var config = require('../src/utils/config');

var defaultRenderer = marked.Renderer.prototype;

var MARKED_BLOCK_METHODS = [
	'blockquote',
	'html',
	'heading',
	'hr',
	'list',
	'paragraph',
	'table'
];

function readExamples(markdown) {
	var chunks = [];
	var htmlChunks = [];

	var renderer = new marked.Renderer();
	wrapRendererMethods(renderer, defaultRenderer, MARKED_BLOCK_METHODS, function(html) {
		htmlChunks.push(html);
	});
	renderer.code = function(code) {
		if (htmlChunks.length) {
			chunks.push({type: 'html', content: htmlChunks.join('')});
			htmlChunks = [];
		}
		chunks.push({type: 'code', content: code});
	};

	marked(markdown, {renderer: renderer});

	if (htmlChunks.length) {
		chunks.push({type: 'html', content: htmlChunks.join('')});
	}

	return chunks;
}

function wrapRendererMethods(to, from, methods, wrapper) {
	methods.forEach(function(name) {
		to[name] = function() {
			wrapper(from[name].apply(from, arguments));
		};
	});
}

module.exports = function (source, map) {
	this.cacheable && this.cacheable();

	var examples = readExamples(source);

	return [
			'if (module.hot) {',
			'	module.hot.accept([]);',
			'}',
			'module.exports = ' + JSON.stringify(examples)
		].join('\n');
};
