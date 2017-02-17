'use strict';

const pick = require('lodash/pick');
const getAllComponentsWithExamples = require('./getAllComponentsWithExamples');
const getAllContentPages = require('./getAllContentPages');
const getComponentFilesFromSections = require('./getComponentFilesFromSections');
const getSections = require('./getSections');
const filterComponentsWithExample = require('./filterComponentsWithExample');

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

module.exports = function getStyleguide(config) {
	let sections = getSections(config.sections, config);
	if (config.skipComponentsWithoutExample) {
		sections = filterComponentsWithExample(sections);
	}

	const allComponentFiles = getComponentFilesFromSections(config.sections, config.configDir);
	const allContentPages = getAllContentPages(sections);
	const allComponentsWithExamples = getAllComponentsWithExamples(sections);

	const welcomeScreen = {
		// Nothing to show in the style guide
		components: allContentPages.length === 0 && allComponentFiles.length === 0,
		// All component have no example files
		examples: allContentPages.length === 0 && allComponentFiles.length > 0 && allComponentsWithExamples.length === 0,
	};

	return {
		config: pick(config, CLIENT_CONFIG_OPTIONS),
		welcomeScreen,
		sections,
		allComponentFiles,
	};
};
