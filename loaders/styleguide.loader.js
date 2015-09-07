var fs = require('fs');
var path = require('path');
var glob = require('glob');
var config = require('../src/utils/config');

function processComponent(filepath) {
	var examplesFile = config.getExampleFilename(filepath);
	if (!fs.existsSync(examplesFile)) {
		return null;
	}
	var pathJson = JSON.stringify(filepath);
	return '{' + [
			'filepath: ' + pathJson,
			'module: require(' + pathJson + ')',
			'examples: require(' + JSON.stringify('examples!' + examplesFile) + ')'
		].join(',') + '}';
}

module.exports = function() {};
module.exports.pitch = function() {
	this.cacheable && this.cacheable();

	var componentSources = glob.sync(path.join(config.rootDir, config.components));

	var components = componentSources.map(processComponent);

	// Remove components without examples
	components = components.filter(function(component) {
		return !!component
	});

	return 'module.exports = [' + components.join(',') + ']';
};
