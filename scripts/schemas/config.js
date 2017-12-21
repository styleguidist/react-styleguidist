'use strict';

// If you want to access any of these options in React, don’t forget to update CLIENT_CONFIG_OPTIONS array
// in loaders/styleguide-loader.js

const EXTENSIONS = 'js,jsx,ts,tsx';
const DEFAULT_COMPONENTS_PATTERN = `src/@(components|Components)/**/*.{${EXTENSIONS}}`;

const path = require('path');
const startCase = require('lodash/startCase');
const reactDocgen = require('react-docgen');
const createDisplayNameHandler = require('react-docgen-displayname-handler')
	.createDisplayNameHandler;
const annotationResolver = require('react-docgen-annotation-resolver').default;
const logger = require('glogg')('rsg');
const findUserWebpackConfig = require('../utils/findUserWebpackConfig');
const getUserPackageJson = require('../utils/getUserPackageJson');
const fileExistsCaseInsensitive = require('../utils/findFileCaseInsensitive');
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
	configDir: {
		process: (value, config, rootDir) => rootDir,
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
				const existingFile = fileExistsCaseInsensitive(file);
				if (existingFile) {
					return existingFile;
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
		default: [
			'**/__tests__/**',
			`**/*.test.{${EXTENSIONS}}`,
			`**/*.spec.{${EXTENSIONS}}`,
			'**/*.d.ts',
		],
	},
	highlightTheme: {
		type: 'string',
		default: 'base16-light',
		deprecated: 'Use the theme property in the editorConfig option instead',
	},
	editorConfig: {
		type: 'object',
		process: (value, config) => {
			const defaults = {
				theme: 'base16-light',
				mode: 'jsx',
				lineWrapping: true,
				smartIndent: false,
				matchBrackets: true,
				viewportMargin: Infinity,
				lineNumbers: false,
			};
			return Object.assign(
				{},
				defaults,
				config.highlightTheme && { theme: config.highlightTheme },
				value
			);
		},
	},
	logger: {
		type: 'object',
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
		default: (ast, recast) => {
			const findAllExportedComponentDefinitions =
				reactDocgen.resolver.findAllExportedComponentDefinitions;
			const annotatedComponents = annotationResolver(ast, recast);
			const exportedComponents = findAllExportedComponentDefinitions(ast, recast);
			return annotatedComponents.concat(exportedComponents);
		},
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
	styleguideComponents: {
		type: 'object',
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
	updateExample: {
		type: 'function',
		default: props => {
			if (props.lang === 'example') {
				props.lang = 'js';
				logger.warn(
					'"example" code block language is deprecated. Use "js", "jsx" or "javascript" instead:\n' +
						consts.DOCS_DOCUMENTING
				);
			}
			return props;
		},
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
				logger.info(`Loading webpack config from:\n${file}`);
				// eslint-disable-next-line import/no-dynamic-require
				return require(file);
			}

			logger.warn(
				'No webpack config found. ' +
					'You may need to specify "webpackConfig" option in your style guide config:\n' +
					consts.DOCS_WEBPACK
			);

			return undefined;
		},
		example: {
			module: {
				rules: [
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
