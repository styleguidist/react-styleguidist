jest.mock('../build');
jest.mock('../server');
jest.mock('../utils/getWebpackVersion');

import last from 'lodash/last';
import styleguidist from '../index';

const getDefaultWebpackConfig = () => styleguidist().makeWebpackConfig();

const cwd = process.cwd();
afterEach(() => {
	process.chdir(cwd);
});

it('should return API methods', () => {
	const api = styleguidist(require('../../test/data/styleguide.config.js'));
	expect(api).toBeTruthy();
	expect(typeof api.build).toBe('function');
	expect(typeof api.server).toBe('function');
	expect(typeof api.makeWebpackConfig).toBe('function');
});

describe('makeWebpackConfig', () => {
	it('should return development Webpack config', () => {
		const api = styleguidist();
		const result = api.makeWebpackConfig('development');
		expect(result).toBeTruthy();
		expect(result.output.filename).toBe('build/[name].bundle.js');
		expect(result.output.chunkFilename).toBe('build/[name].js');
	});

	it('should return production Webpack config', () => {
		const api = styleguidist();
		const result = api.makeWebpackConfig('production');
		expect(result).toBeTruthy();
		expect(result.output.filename).toBe('build/bundle.[chunkhash:8].js');
		expect(result.output.chunkFilename).toBe('build/[name].[chunkhash:8].js');
	});

	it('should merge webpackConfig config option', () => {
		const defaultWebpackConfig = getDefaultWebpackConfig();
		const api = styleguidist({
			webpackConfig: {
				resolve: {
					extensions: ['.scss'],
				},
			},
		});
		const result = api.makeWebpackConfig();

		expect(result).toBeTruthy();
		expect(result.resolve.extensions.length).toEqual(
			defaultWebpackConfig.resolve.extensions.length + 1
		);
		expect(last(result.resolve.extensions)).toEqual('.scss');
	});

	it('should merge webpackConfig but ignore output section', () => {
		const defaultWebpackConfig = getDefaultWebpackConfig();
		const api = styleguidist({
			webpackConfig: {
				resolve: {
					extensions: ['.scss'],
				},
				output: {
					filename: 'broken.js',
				},
			},
		});
		const result = api.makeWebpackConfig();

		expect(result.output.filename).toEqual(defaultWebpackConfig.output.filename);
	});

	it('should merge webpackConfig config option as a function', () => {
		const api = styleguidist({
			webpackConfig: env => ({
				_env: env,
			}),
		});
		const result = api.makeWebpackConfig();

		expect(result).toBeTruthy();
		expect(result._env).toEqual('production');
	});

	it('should apply updateWebpackConfig config option', () => {
		/* eslint-disable no-console */
		const originalWarn = console.warn;

		console.warn = jest.fn();
		const defaultWebpackConfig = getDefaultWebpackConfig();
		const api = styleguidist({
			dangerouslyUpdateWebpackConfig: (webpackConfig, env) => {
				webpackConfig.resolve.extensions.push(env);
				return webpackConfig;
			},
		});
		const result = api.makeWebpackConfig();

		expect(result).toBeTruthy();
		expect(result.resolve.extensions.length).toEqual(
			defaultWebpackConfig.resolve.extensions.length + 1
		);
		expect(last(result.resolve.extensions)).toEqual('production');

		console.warn = originalWarn;
		/* eslint-enable no-console */
	});

	it('should merge Create React App Webpack config', () => {
		process.chdir('test/apps/cra');
		const api = styleguidist();
		const result = api.makeWebpackConfig();

		expect(result).toBeTruthy();
		expect(result.cra).toBeTruthy();
	});

	it('should add json-loader', () => {
		const api = styleguidist();
		const result = api.makeWebpackConfig();

		expect(result.module.loaders).toHaveLength(1);
		expect(last(result.module.loaders).loader).toEqual('json-loader');
	});

	it('should add webpack entry for each require config option item', () => {
		const modules = ['babel-polyfill', 'path/to/styles.css'];
		const api = styleguidist({
			require: modules,
		});
		const result = api.makeWebpackConfig();

		expect(result.entry).toEqual(expect.arrayContaining(modules));
	});
});

describe('build', () => {
	it('should pass style guide config and stats to callback', () => {
		const config = {
			components: '*.js',
		};
		const callback = jest.fn();
		const api = styleguidist(config);
		api.build(callback);

		expect(callback).toBeCalled();
		expect(callback.mock.calls[0][1].components).toBe(config.components);
		expect(callback.mock.calls[0][2]).toEqual({ stats: true });
	});
});

describe('server', () => {
	it('should pass style guide config to callback', () => {
		const config = {
			components: '*.js',
		};
		const callback = jest.fn();
		const api = styleguidist(config);
		api.server(callback);

		expect(callback).toBeCalled();
		expect(callback.mock.calls[0][1].components).toBe(config.components);
	});
});
