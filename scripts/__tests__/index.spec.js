jest.mock('../build');
jest.mock('../server');

import last from 'lodash/last';
import styleguidist from '../index';

const getDefaultWebpackConfig = () => styleguidist({ webpackConfigFile: false }).makeWebpackConfig();

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

it('makeWebpackConfig should return development Webpack config', () => {
	const api = styleguidist();
	const result = api.makeWebpackConfig('development');
	expect(result).toBeTruthy();
	expect(result.output.filename).toBe('build/bundle.js');
	expect(result.cache).toBe(true);
});

it('makeWebpackConfig should return production Webpack config', () => {
	const api = styleguidist();
	const result = api.makeWebpackConfig('production');
	expect(result).toBeTruthy();
	expect(result.output.filename).toBe('build/bundle.js');
	expect(result.cache).toBe(false);
});

it('makeWebpackConfig should merge webpackConfig config option', () => {
	const defaultWebpackConfig = getDefaultWebpackConfig();
	const api = styleguidist({
		webpackConfigFile: false,
		webpackConfig: {
			resolve: {
				extensions: ['.scss'],
			},
		},
	});
	const result = api.makeWebpackConfig();

	expect(result).toBeTruthy();
	expect(result.resolve.extensions.length).toEqual(defaultWebpackConfig.resolve.extensions.length + 1);
	expect(last(result.resolve.extensions)).toEqual('.scss');
});


it('makeWebpackConfig should merge webpackConfig but ignore output section', () => {
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

it('makeWebpackConfig should merge webpackConfig config option as a function', () => {
	const api = styleguidist({
		webpackConfig: env => ({
			_env: env,
		}),
	});
	const result = api.makeWebpackConfig();

	expect(result).toBeTruthy();
	expect(result._env).toEqual('production');
});

it('makeWebpackConfig should merge config from webpackConfigFile config option', () => {
	const defaultWebpackConfig = getDefaultWebpackConfig();
	const api = styleguidist({
		webpackConfigFile: 'test/data/webpack.config.js',
	});
	const result = api.makeWebpackConfig();

	expect(result).toBeTruthy();
	expect(result.output.filename).toEqual(defaultWebpackConfig.output.filename);
	expect(last(result.resolve.extensions)).toEqual('.scss');
});

it('makeWebpackConfig should merge config from webpackConfigFile config option as a function', () => {
	const api = styleguidist({
		webpackConfigFile: 'test/data/webpack.config.func.js',
	});
	const result = api.makeWebpackConfig();

	expect(result).toBeTruthy();
	expect(last(result.resolve.extensions)).toEqual('production');
});

it('makeWebpackConfig should apply updateWebpackConfig config option', () => {
	const defaultWebpackConfig = getDefaultWebpackConfig();
	const api = styleguidist({
		updateWebpackConfig: (webpackConfig, env) => {
			webpackConfig.resolve.extensions.push(env);
			return webpackConfig;
		},
	});
	const result = api.makeWebpackConfig();

	expect(result).toBeTruthy();
	expect(result.resolve.extensions.length).toEqual(defaultWebpackConfig.resolve.extensions.length + 1);
	expect(last(result.resolve.extensions)).toEqual('production');
});

it('makeWebpackConfig should merge create-react-app Webpack config', () => {
	process.chdir('test/apps/cra');
	const api = styleguidist();
	const result = api.makeWebpackConfig();

	expect(result).toBeTruthy();
	expect(result.cra).toBeTruthy();
});

it('build() should pass style guide config and stats to callback', () => {
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

it('server() should pass style guide config to callback', () => {
	const config = {
		components: '*.js',
	};
	const callback = jest.fn();
	const api = styleguidist(config);
	api.server(callback);

	expect(callback).toBeCalled();
	expect(callback.mock.calls[0][1].components).toBe(config.components);
});
