'use strict';

const pick = require('lodash/pick');
const prettyjson = require('prettyjson');
const toCode = require('./utils/toCode');
const getComponents = require('./utils/getComponents');
const getComponentsCode = require('./utils/getComponentsCode');
const getSectionsCode = require('./utils/getSectionsCode');

/* eslint-disable no-console */

// Config options that should be passed to the client
const CLIENT_CONFIG_OPTIONS = [
	'title',
	'highlightTheme',
	'showCode',
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
	const componentFiles = getComponents(config.components, config);

	/* istanbul ignore if */
	if (config.verbose) {
		console.log();
		console.log('Loading components:');
		console.log(prettyjson.render(componentFiles));
		console.log();
	}

	const code = toCode({
		config: JSON.stringify(clientConfig),
		components: getComponentsCode(componentFiles, config),
		sections: getSectionsCode(config.sections, config),
	});
	return `module.exports = ${code};`;
};
