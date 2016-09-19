const fs = require('fs');
const path = require('path');
const glob = require('glob');
const prettyjson = require('prettyjson');
const pick = require('lodash/pick');

/* eslint-disable no-console */

function processComponent(filepath, config) {
    // If component name can’t be detected in runtime use filename or folder name (if file name is 'index')
	const filename = path.basename(filepath).replace(/\.\w+$/, '');
	const nameFallback = filename === 'index' ? path.basename(path.dirname(filepath)) : filename;

	return '{' + [
		'filepath: ' + JSON.stringify(filepath),
		'nameFallbak: ' + JSON.stringify(nameFallback),
		'pathLine: ' + JSON.stringify(config.getComponentPathLine(path.relative(config.configDir, filepath))),
		'module: ' + requireIt(filepath),
		'props: ' + requireIt('!!props!' + filepath),
		'examples: ' + getExamples(filepath, nameFallback, config),
	].join(',') + '}';
}

function getExamples(filepath, nameFallback, config) {
	const examplesFile = config.getExampleFilename(filepath);

	if (hasExamples(filepath, config)) {
		return requireIt('examples!' + examplesFile);
	}

	if (config.defaultExample) {
		return requireIt('examples?componentName=' + nameFallback + '!' + config.defaultExample);
	}

	return null;
}

function hasExamples(filepath, config) {
	const examplesFile = config.getExampleFilename(filepath);
	return !!fs.existsSync(examplesFile);
}

function requireIt(filepath) {
	return 'require(' + JSON.stringify(filepath) + ')';
}

function processComponentsSource(components, config) {
	if (!components) {
		return null;
	}

	let componentSources;
	if (typeof components === 'function') {
		componentSources = components();
	}
	else {
		componentSources = glob.sync(path.resolve(config.configDir, components));
	}

	if (config.verbose) {
		console.log();
		console.log('Loading components:');
		console.log(prettyjson.render(componentSources));
		console.log();
	}

	if (config.skipComponentsWithoutExample) {
		componentSources = componentSources.filter(hasExamples);
	}

	return '[' + componentSources.map(component => processComponent(component, config)).join(',') + ']';
}

function processSection(section, config) {
	return '{' + [
		'name: ' + JSON.stringify(section.name),
		'content: ' + (section.content ? requireIt('examples!' + path.resolve(config.configDir, section.content)) : null),
		'components: ' + processComponentsSource(section.components, config),
		'sections: ' + processSectionsList(section.sections, config),
	].join(',') + '}';
}

function processSectionsList(sections, config) {
	if (!sections) {
		return null;
	}

	return '[' +
		sections.map(section => processSection(section, config)).join(',') +
	']';
}

module.exports = function() {};
module.exports.pitch = function() {
	if (this.cacheable) {
		this.cacheable();
	}

	const config = this.options.styleguidist;

	// Example usage of query options:
	// require('!!styleguide?{"configFilepath":"/path/to/config.js"}!');
	if (this.query) {
		const query = JSON.parse(this.query.substring(1));  // getting rid of '?'
		if (query.configFilepath) {
			config.initialize({ config: query.configFilepath });
		}
	}

	const simplifiedConfig = pick(config, [
		'title',
		'highlightTheme',
		'showCode',
	]);

	return `
		module.exports = {
			config: ${JSON.stringify(simplifiedConfig)},
			components: ${processComponentsSource(config.components, config)},
			sections: ${processSectionsList(config.sections, config)}
		};
	`;
};
