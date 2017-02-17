'use strict';

// If you want to access any of these options in React, don’t forget to update CLIENT_CONFIG_OPTIONS array
// in loaders/styleguide-loader.js

const fs = require('fs');
const path = require('path');
const startCase = require('lodash/startCase');
const reactDocgen = require('react-docgen');
const createDisplayNameHandler = require('react-docgen-displayname-handler').createDisplayNameHandler;
const findUserWebpackConfig = require('../utils/findUserWebpackConfig');
const getUserPackageJson = require('../utils/getUserPackageJson');
const consts = require('../consts');

module.exports = {
	assetsDir: {
		type: 'existing directory path',
		example: 'assets',
	},
	// `components` is a shortcut for { sections: [{ components }] }, see `sections` below
	components: {
		type: ['string', 'function'],
		example: 'components/**/[A-Z]*.js',
	},
	context: {
		type: 'object',
		default: {},
		example: {
			map: 'lodash/map',
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
		example: componentPath => componentPath.replace(/\.jsx?$/, '.examples.md'),
	},
	handlers: {
		type: 'function',
		default: componentPath => reactDocgen.defaultHandlers.concat(createDisplayNameHandler(componentPath)),
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
		process: (val, config) => {
			if (!val) {
				// If root `components` isn't empty, make it a first section
				// If `components` and `sections` weren’t specified, use default pattern
				const components = config.components || 'src/components/**/*.js';
				return [{ components }];
			}
			return val;
		},
		example: [
			{
				name: 'Documentation',
				content: 'Readme.md',
			},
			{
				name: 'Components',
				components: './lib/components/**/[A-Z]*.js',
			},
		],
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
	showSidebar: {
		type: 'boolean',
		default: true,
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
		example: {
			Logo: {
				logo: {
					fontStyle: 'italic',
				},
			},
		},
	},
	template: {
		type: 'existing file path',
		default: path.resolve(__dirname, '../templates/index.html'),
		example: 'templates/styleguide.html',
	},
	theme: {
		type: 'object',
		default: {},
		example: {
			link: 'firebrick',
			linkHover: 'salmon',
		},
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
		example: 'My Style Guide',
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
		example: {
			module: {
				loaders: [
					{
						test: /\.jsx?$/,
						exclude: /node_modules/,
						loader: 'babel-loader',
					},
				],
			},
		},
	},
	webpackConfigFile: {
		type: ['module path'],
		process: (val, config) => {
			if (!val && !config.webpackConfig && !config.updateWebpackConfig) {
				return findUserWebpackConfig();
			}
			return val;
		},
		example: './configs/webpack.js',
	},
};
