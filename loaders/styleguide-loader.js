'use strict';

const pick = require('lodash/pick');
const commonDir = require('common-dir');
const generate = require('escodegen').generate;
const toAst = require('to-ast');
const getAllContentPages = require('./utils/getAllContentPages');
const getComponentFilesFromSections = require('./utils/getComponentFilesFromSections');
const getComponentPatternsFromSections = require('./utils/getComponentPatternsFromSections');
const getSections = require('./utils/getSections');
const filterComponentsWithExample = require('./utils/filterComponentsWithExample');

/* eslint-disable no-console */

// Config options that should be passed to the client
const CLIENT_CONFIG_OPTIONS = [
	'title',
	'highlightTheme',
	'showCode',
	'showUsage',
	'showSidebar',
	'previewDelay',
	'theme',
	'styles',
	'compilerConfig',
];

module.exports = function() {};
module.exports.pitch = function() {
	/* istanbul ignore if */
	if (this.cacheable) {
		this.cacheable();
	}

	const config = this._styleguidist;

	let sections = getSections(config.sections, config);
	if (config.skipComponentsWithoutExample) {
		sections = filterComponentsWithExample(sections);
	}

	const allComponentFiles = getComponentFilesFromSections(
		config.sections,
		config.configDir,
		config.ignore
	);
	const allContentPages = getAllContentPages(sections);

	// Nothing to show in the style guide
	const welcomeScreen = allContentPages.length === 0 && allComponentFiles.length === 0;
	const patterns = welcomeScreen ? getComponentPatternsFromSections(config.sections) : undefined;

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
	} else if (allComponentFiles.length > 0) {
		// Use common parent directory of all components as a context
		this.addContextDependency(commonDir(allComponentFiles));
	}

	const styleguide = {
		config: pick(config, CLIENT_CONFIG_OPTIONS),
		welcomeScreen,
		patterns,
		sections,
	};

	return `
if (module.hot) {
	module.hot.accept([])
}

module.exports = ${generate(toAst(styleguide))}
	`;
};
