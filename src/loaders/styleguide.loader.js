var fs = require('fs');
var path = require('path');
var loaderUtils = require('loader-utils');
var findup = require('findup');
var glob = require('glob');
var marked = require('marked');
var _ = require('lodash');

var defaultRenderer = marked.Renderer.prototype;

var CONFIG_FILENAME = 'styleguide.config.js';
var MARKED_BLOCK_METHODS = [
	'blockquote',
	'html',
	'heading',
	'hr',
	'list',
	'paragraph',
	'table'
];
var DEFAULT_CONFIG = {
	getExampleFilename: function(componentpath) {
		return path.join(path.dirname(componentpath),  'examples.md');
	}
};

function readConfig() {
	try {
		var rootDir = findup.sync(__dirname, CONFIG_FILENAME);
	}
	catch (e) {
		throw Error('Styleguidist config not found: ' + CONFIG_FILENAME + '.');
	}

	var options = require(path.join(rootDir, CONFIG_FILENAME));

	validateConfig(options);

	options = _.merge({}, DEFAULT_CONFIG, options, {
		rootDir: rootDir
	});

	return options;
}

function validateConfig(options) {
	if (!options.components) {
		throw Error('Styleguidist: "components" options is required.');
	}
	if (options.getExampleFilename && typeof options.getExampleFilename !== 'function') {
		throw Error('Styleguidist: "getExampleFilename" options must be a function.');
	}
}

function processComponent(options, filepath) {
	var examples = readExamples(options.getExampleFilename(filepath));
	if (examples) {
		var pathJson = JSON.stringify(filepath);
		return '{' + [
				'filepath: ' + pathJson,
				'module: require(' + pathJson + ')',
				'examples: ' + JSON.stringify(examples)
			].join(',') + '}';
	}
	else {
		return null;
	}
}

function readExamples(filepath) {
	if (!fs.existsSync(filepath)) {
		return null;
	}

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

	var markdown = fs.readFileSync(filepath, {encoding: 'utf8'});
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

module.exports = function() {};
module.exports.pitch = function() {
	this.cacheable && this.cacheable();

	var options = readConfig();
	var componentSources = glob.sync(path.join(options.rootDir, options.components));

	var components = componentSources.map(processComponent.bind(null, options));

	// Remove components without examples
	components = components.filter(function(component) {
		return !!component
	});

	return 'module.exports = [' + components.join(',') + ']';
};
