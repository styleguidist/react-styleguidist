var fs = require('fs');
var path = require('path');
var glob = require('glob');
var config = require('../src/utils/config');

function processComponent(filepath) {
	var examplesFile = config.getExampleFilename(filepath);
	var hasExamples = !!fs.existsSync(examplesFile);
	return '{' + [
			'filepath: ' + JSON.stringify(filepath),
			'module: ' + requireIt(filepath),
			'props: ' + requireIt('!!props!' + filepath),
			'examples: ' + (hasExamples ? requireIt('examples!' + examplesFile) : null)
		].join(',') + '}';
}

function requireIt(filepath) {
	return 'require(' + JSON.stringify(filepath) + ')';
}

module.exports = function() {};
module.exports.pitch = function() {
	this.cacheable && this.cacheable();

	var componentSources = glob.sync(path.join(config.rootDir, config.components));
	var components = componentSources.map(processComponent);

	return [
		'module.exports = {',
		'	title: ' + JSON.stringify(config.title) + ',',
		'	components: [' + components.join(',') + ']',
		'};'
	].join('\n');
};
