'use strict';

const fs = require('fs');
const path = require('path');
const startCase = require('lodash/startCase');
const reactDocgen = require('react-docgen');
const displayNameHandler = require('react-docgen-displayname-handler').default;
const findUserWebpackConfig = require('../utils/findUserWebpackConfig');
const getUserPackageJson = require('../utils/getUserPackageJson');
const consts = require('../consts');

module.exports = {
	assetsDir: {
		type: 'existing directory path',
	},
	components: {
		type: ['string', 'function'],
		process: (val, config) => ((!val && !config.sections) ? 'src/components/**/*.js' : val),
	},
	context: {
		type: 'object',
		default: {
			React: 'react',
		},
	},
	contextDependencies: {
		type: 'array',
	},
	configureServer: {
		type: 'function',
	},
	defaultExample: {
		type: ['boolean', 'existing file path'],
		default: false,
		process: val => (val === true ? path.resolve(__dirname, '../templates/DefaultExample.md') : val),
	},
	getComponentPathLine: {
		type: 'function',
		default: componentPath => componentPath,
	},
	getExampleFilename: {
		type: 'function',
		default: componentPath => {
			const files = [
				path.join(path.dirname(componentPath), 'Readme.md'),
				componentPath.replace(/\.jsx?$/, '.md'),
			];

			for (const file of files) {
				if (fs.existsSync(file)) {
					return file;
				}
			}

			return false;
		},
	},
	handlers: {
		default: reactDocgen.defaultHandlers.concat(displayNameHandler),
	},
	highlightTheme: {
		type: 'string',
		default: 'base16-light',
	},
	previewDelay: {
		type: 'number',
		default: 500,
	},
	propsParser: {
		type: 'function',
	},
	resolver: {
		type: 'function',
		default: reactDocgen.resolver.findAllExportedComponentDefinitions,
	},
	sections: {
		type: 'array',
		default: [],
	},
	serverHost: {
		type: 'string',
		default: 'localhost',
	},
	serverPort: {
		type: 'number',
		default: 3000,
	},
	showCode: {
		type: 'boolean',
		default: false,
	},
	skipComponentsWithoutExample: {
		type: 'boolean',
		default: false,
	},
	styleguideDir: {
		type: 'directory path',
		default: 'styleguide',
	},
	styles: {
		type: 'object',
		default: {},
	},
	template: {
		type: 'existing file path',
		default: path.resolve(__dirname, '../templates/index.html'),
	},
	theme: {
		type: 'object',
		default: {},
	},
	title: {
		type: 'string',
		process: val => {
			if (val) {
				return val;
			}

			const name = getUserPackageJson().name;
			return `${startCase(name)} Style Guide`;
		},
	},
	updateWebpackConfig: {
		type: 'function',
		deprecated: `Use "webpackConfigFile" or "webpackConfig" options instead:\n${consts.DOCS_CONFIG}`,
	},
	verbose: {
		type: 'boolean',
		default: false,
	},
	webpackConfig: {
		type: ['object', 'function'],
	},
	webpackConfigFile: {
		type: ['module path'],
		process: (val, config) => {
			if (!val && !config.webpackConfig && !config.updateWebpackConfig) {
				return findUserWebpackConfig();
			}
			return val;
		},
	},
};
