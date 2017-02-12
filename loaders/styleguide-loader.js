'use strict';

const pick = require('lodash/pick');
const commonDir = require('common-dir');
const generate = require('escodegen').generate;
const toAst = require('to-ast');
const getSections = require('./utils/getSections');
const getComponentFilesFromSections = require('./utils/getComponentFilesFromSections');

/* eslint-disable no-console */

// Config options that should be passed to the client
const CLIENT_CONFIG_OPTIONS = [
	'title',
	'highlightTheme',
	'showCode',
	'showSidebar',
	'previewDelay',
	'theme',
	'styles',
];

module.exports = function() {};
module.exports.pitch = function() {
	/* istanbul ignore if */
	if (this.cacheable) {
		this.cacheable();
	}

	const config = this.options.styleguidist;
	const clientConfig = pick(config, CLIENT_CONFIG_OPTIONS);

	const allComponentFiles = getComponentFilesFromSections(config.sections, config);

	/* istanbul ignore if */
	if (config.verbose) {
		console.log();
		console.log('Loading components:');
		console.log(allComponentFiles.join('\n'));
		console.log();
	}

	// Setup Webpack context dependencies to enable hot reload when adding new files
	if (config.contextDependencies) {
		config.contextDependencies.forEach(dir => this.addContextDependency(dir));
	}
	else if (allComponentFiles.length) {
		// Get list of all component files including components in sections,
		// and use their common parent directory as a context
		this.addContextDependency(commonDir(allComponentFiles));
	}

	const styleguide = {
		config: clientConfig,
		sections: getSections(config.sections, config),
	};

	return `
if (module.hot) {
	module.hot.accept([])
}

module.exports = ${generate(toAst(styleguide))}
	`;
};
