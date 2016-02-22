var fs = require('fs');
var path = require('path');
var glob = require('glob');
var prettyjson = require('prettyjson');
var _ = require('lodash');
var config = require('../src/utils/config');

function processComponent(filepath) {
	var examplesFile = config.getExampleFilename(filepath);

    // If component name can’t be detected in runtime use filename or folder name (if file name is 'index')
    var filename = path.basename(filepath).replace(/\.\w+$/, '');
    var nameFallbak = filename === 'index' ? path.basename(path.dirname(filepath)) : filename;

	return '{' + [
        'filepath: ' + JSON.stringify(filepath),
		'nameFallbak: ' + JSON.stringify(nameFallbak),
		'pathLine: ' + JSON.stringify(config.getComponentPathLine(path.relative(config.configDir, filepath))),
		'module: ' + requireIt(filepath),
		'props: ' + requireIt('!!props!' + filepath),
		'examples: ' + (hasExamples(filepath) ? requireIt('examples!' + examplesFile) : null)
	].join(',') + '}';
}

function hasExamples(filepath) {
	var examplesFile = config.getExampleFilename(filepath);
	return !!fs.existsSync(examplesFile);
}

function requireIt(filepath) {
	return 'require(' + JSON.stringify(filepath) + ')';
}

module.exports = function() {};
module.exports.pitch = function() {
	this.cacheable && this.cacheable();

	var componentSources;
	if (typeof config.components === 'function') {
		componentSources = config.components(config, glob);
	}
	else {
		componentSources = glob.sync(path.resolve(config.configDir, config.components));
	}

	if (config.verbose) {
		console.log();
		console.log('Loading components:');
		console.log(prettyjson.render(componentSources));
		console.log();
	}

	if (config.skipComponentsWithoutExample) {
		componentSources = _.filter(componentSources, hasExamples);
	}

	var components = componentSources.map(processComponent);

	var simplifiedConfig = _.pick(config, [
		'title',
		'highlightTheme'
	]);

	return [
		'module.exports = {',
		'	config: ' + JSON.stringify(simplifiedConfig) + ',',
		'	components: [' + components.join(',') + ']',
		'};'
	].join('\n');
};
