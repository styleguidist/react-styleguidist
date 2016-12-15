'use strict';

const path = require('path');
const reactDocgen = require('react-docgen');
const displayNameHandler = require('react-docgen-displayname-handler').default;

const componentsOrSectionsMessage = '"components" or "sections" option is required';

module.exports = {
	assetsDir: {
		type: 'existing directory path',
	},
	components: {
		type: ['string', 'function'],
		required: config => !config.sections && componentsOrSectionsMessage,
	},
	context: {
		type: 'object',
		default: {
			React: 'react',
		},
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
		default: componentPath => path.join(path.dirname(componentPath), 'Readme.md'),
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
	sections: {
		type: 'array',
		required: config => !config.components && componentsOrSectionsMessage,
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
		type: 'file path',
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
		default: 'Style guide',
	},
	updateWebpackConfig: {
		type: 'function',
	},
	verbose: {
		type: 'boolean',
		default: false,
	},
	webpackConfig: {
		type: ['object', 'function'],
	},
	webpackConfigFile: {
		type: ['existing file path'],
	},
};
