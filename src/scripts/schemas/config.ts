// If you want to access any of these options in React, don’t forget to update CLIENT_CONFIG_OPTIONS array
// in loaders/styleguide-loader.js

import glogg from 'glogg';
import path from 'path';
import startCase from 'lodash/startCase';
import kleur from 'kleur';
import * as reactDocgen from 'react-docgen';
import { TransformOptions } from 'buble';
import { createDisplayNameHandler } from 'react-docgen-displayname-handler';
import annotationResolver from 'react-docgen-annotation-resolver';
import { ASTNode } from 'ast-types';
import { NodePath } from 'ast-types/lib/node-path';
import findUserWebpackConfig from '../utils/findUserWebpackConfig';
import getUserPackageJson from '../utils/getUserPackageJson';
import fileExistsCaseInsensitive from '../utils/findFileCaseInsensitive';
import StyleguidistError from '../utils/error';
import * as consts from '../consts';
import { Section } from '../../typings/Section';
import { ThemeOverride } from '../../typings/Theme';
import { Styles } from '../../typings/Styles';

const EXTENSIONS = 'js,jsx,ts,tsx';
const DEFAULT_COMPONENTS_PATTERN =
	// HACK: on windows, the case insensitivity makes each component appear twice
	// to avoid this issue, the case management is removed on win32
	// it virtually changes nothing
	process.platform === 'win32'
		? /* istanbul ignore next: no windows on our test plan */ `src/components/**/*.{${EXTENSIONS}}`
		: `src/@(components|Components)/**/*.{${EXTENSIONS}}`;

const logger = glogg('rsg');

export type EXPAND_MODE = 'expand' | 'collapse';

export interface ProcessedStyleguidistConfig {
	compilerConfig: TransformOptions;
	showCode: EXPAND_MODE;
	showUsage: EXPAND_MODE;
	components: string;
	theme: ThemeOverride;
	// TODO: be more specific about this typing
	styles: Styles;
}

export type StyleguidistConfig = Partial<ProcessedStyleguidistConfig>;

const configSchema = {
	assetsDir: {
		type: ['array', 'existing directory path'],
		example: 'assets',
	},
	compilerConfig: {
		type: 'object',
		default: {
			// Don't include an Object.assign ponyfill, we have our own
			objectAssign: 'Object.assign',
			// Transpile only features needed for IE11
			target: { ie: 11 },
			transforms: {
				// Don't throw on ESM imports, we transpile them ourselves
				modules: false,
				// Enable tagged template literals for styled-components
				dangerousTaggedTemplateString: true,
				// to make async/await work by default (no transformation)
				asyncAwait: false,
			},
		} as TransformOptions,
	},
	// `components` is a shortcut for { sections: [{ components }] },
	// see `sections` below
	components: {
		type: ['string', 'function', 'array'],
		example: 'components/**/[A-Z]*.js',
	},
	configDir: {
		process: (value: string, config: StyleguidistConfig, rootDir: string): string => rootDir,
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
		process: (val: boolean | string): string | boolean =>
			val === true ? path.resolve(__dirname, '../../../templates/DefaultExample.md') : val,
	},
	exampleMode: {
		type: 'string',
		process: (value: string, config: StyleguidistConfig) => {
			return config.showCode === undefined ? value : config.showCode ? 'expand' : 'collapse';
		},
		default: 'collapse',
	},
	getComponentPathLine: {
		type: 'function',
		default: (componentPath: string): string => componentPath,
	},
	getExampleFilename: {
		type: 'function',
		default: (componentPath: string): string | boolean => {
			const files = [
				path.join(path.dirname(componentPath), 'Readme.md'),
				// ComponentName.md
				componentPath.replace(path.extname(componentPath), '.md'),
				// FolderName.md when component definition file is index.js
				path.join(path.dirname(componentPath), path.basename(path.dirname(componentPath)) + '.md'),
			];
			// FIXME: This looks like a bug in ESLint
			// eslint-disable-next-line no-unused-vars
			for (const file of files) {
				const existingFile = fileExistsCaseInsensitive(file);
				if (existingFile) {
					return existingFile;
				}
			}
			return false;
		},
	},
	handlers: {
		type: 'function',
		default: (componentPath: string): reactDocgen.Handler[] =>
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
	editorConfig: {
		process: (value?: {}): void => {
			if (value) {
				throw new StyleguidistError(
					`${kleur.bold(
						'editorConfig'
					)} config option was removed. Use “theme” option to change syntax highlighting.`
				);
			}
		},
	},
	logger: {
		type: 'object',
	},
	minimize: {
		type: 'boolean',
		default: true,
	},
	moduleAliases: {
		type: 'object',
	},
	mountPointId: {
		type: 'string',
		default: 'rsg-root',
	},
	pagePerSection: {
		type: 'boolean',
		default: false,
	},
	previewDelay: {
		type: 'number',
		default: 500,
	},
	printBuildInstructions: {
		type: 'function',
	},
	printServerInstructions: {
		type: 'function',
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
		default: (
			ast: ASTNode,
			recast: {
				visit: (
					node: NodePath,
					handlers: { [handlerName: string]: () => boolean | undefined }
				) => void;
			}
		) => {
			const findAllExportedComponentDefinitions =
				reactDocgen.resolver.findAllExportedComponentDefinitions;
			const annotatedComponents = annotationResolver(ast, recast);
			const exportedComponents = findAllExportedComponentDefinitions(ast, recast);
			return annotatedComponents.concat(exportedComponents);
		},
	},
	ribbon: {
		type: 'object',
		example: {
			url: 'http://example.com/',
			text: 'Fork me on GitHub',
		},
	},
	sections: {
		type: 'array',
		default: [],
		process: (val: Section[], config: StyleguidistConfig) => {
			if (!val) {
				// If root `components` isn't empty, make it a first section
				// If `components` and `sections` weren’t specified, use default pattern
				const components = config.components || DEFAULT_COMPONENTS_PATTERN;
				return [
					{
						components,
					},
				];
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
		default: parseInt(process.env.NODE_PORT as string) || 6060,
	},
	showCode: {
		type: 'boolean',
		default: false,
		deprecated: 'Use exampleMode option instead',
	},
	showUsage: {
		type: 'boolean',
		default: false,
		deprecated: 'Use usageMode option instead',
	},
	showSidebar: {
		type: 'boolean',
		default: true,
	},
	skipComponentsWithoutExample: {
		type: 'boolean',
		default: false,
	},
	sortProps: {
		type: 'function',
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
		type: ['object', 'function'],
		default: {},
		process: (val: any) => {
			if (typeof val === 'string') {
				throw new StyleguidistError(
					`${kleur.bold(
						'template'
					)} config option format has been changed, you need to update your config.`,
					'template'
				);
			}
			return val;
		},
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
		process: (val?: string): string => {
			if (val) {
				return val;
			}
			const name = getUserPackageJson().name || '';
			return `${startCase(name)} Style Guide`;
		},
		example: 'My Style Guide',
	},
	updateDocs: {
		type: 'function',
	},
	updateExample: {
		type: 'function',
		default: (props: { lang: string }): { lang: string } => {
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
	usageMode: {
		type: 'string',
		process: (value: string, config: StyleguidistConfig) => {
			return config.showUsage === undefined ? value : config.showUsage ? 'expand' : 'collapse';
		},
		default: 'collapse',
	},
	verbose: {
		type: 'boolean',
		default: false,
	},
	version: {
		type: 'string',
	},
	webpackConfig: {
		type: ['object', 'function'],
		process: (val?: any) => {
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

export default configSchema;
