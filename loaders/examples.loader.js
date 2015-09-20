var fs = require('fs');
var path = require('path');
var marked = require('marked');
var config = require('../src/utils/config');

var defaultRenderer = marked.Renderer.prototype;

function readExamples(markdown) {
	var codePlaceholder = '<%{#}%>';
	var codeChunks = [];

	var renderer = new marked.Renderer();
	renderer.heading = function(text, level, raw) {
		var tag = 'h' + (level + 2);
		return '<' + tag + '>' + text + '</' + tag + '>\n';
	};
	renderer.code = function(code) {
		codeChunks.push(code);
		return codePlaceholder;
	};

	var html = marked(markdown, {renderer: renderer});

	var chunks = [];
	var textChunks = html.split(codePlaceholder);
	textChunks.forEach(function(chunk) {
		if (chunk) {
			chunks.push({type: 'html', content: chunk});
		}
		var code = codeChunks.shift();
		if (code) {
			chunks.push({type: 'code', content: code});
		}
	});

	return chunks;
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
