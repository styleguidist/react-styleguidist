'use strict';

// If you want to access any of these options in React, don’t forget to update CLIENT_CONFIG_OPTIONS array
// in loaders/styleguide-loader.js

/* eslint-disable no-console */

const DEFAULT_COMPONENTS_PATTERN = 'src/@(components|Components)/**/*.{js,jsx}';

const fs = require('fs');
const path = require('path');
const startCase = require('lodash/startCase');
const reactDocgen = require('react-docgen');
const createDisplayNameHandler = require('react-docgen-displayname-handler')
	.createDisplayNameHandler;
const findUserWebpackConfig = require('../utils/findUserWebpackConfig');
const getUserPackageJson = require('../utils/getUserPackageJson');
const consts = require('../consts');

module.exports = {
	assetsDir: {
		type: 'existing directory path',
		example: 'assets',
	},
	compilerConfig: {
		type: 'object',
		default: {
			objectAssign: 'Object.assign',
		},
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
	dangerouslyUpdateWebpackConfig: {
		type: 'function',
	},
	defaultExample: {
		type: ['boolean', 'existing file path'],
		default: false,
		process: val =>
			val === true ? path.resolve(__dirname, '../templates/DefaultExample.md') : val,
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
				componentPath.replace(path.extname(componentPath), '.md'),
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
		default: componentPath =>
			reactDocgen.defaultHandlers.concat(createDisplayNameHandler(componentPath)),
	},
	ignore: {
		type: 'array',
		default: ['**/__tests__/**', '**/*.test.js', '**/*.spec.js', '**/*.test.jsx', '**/*.spec.jsx'],
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
	require: {
		type: 'array',
		default: [],
		example: ['babel-polyfill', 'path/to/styles.css'],
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
				const components = config.components || DEFAULT_COMPONENTS_PATTERN;
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
		default: '0.0.0.0',
	},
	serverPort: {
		type: 'number',
		default: 6060,
	},
	showCode: {
		type: 'boolean',
		default: false,
	},
	showUsage: {
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
		removed: `Use "webpackConfig" option instead:\n${consts.DOCS_WEBPACK}`,
	},
	verbose: {
		type: 'boolean',
		default: false,
	},
	webpackConfig: {
		type: ['object', 'function'],
		process: val => {
			if (val) {
				return val;
			}

			const file = findUserWebpackConfig();
			if (file) {
				console.log('Loading webpack config from:');
				console.log(file);
				console.log();
				return require(file);
			}

			console.log(
				'No webpack config found. ' +
					'You may need to specify "webpackConfig" option in your style guide config:'
			);
			console.log(consts.DOCS_WEBPACK);
			console.log();

			return undefined;
		},
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
};
