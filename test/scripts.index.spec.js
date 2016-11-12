import test from 'ava';
import styleguidist from '../scripts';

test('should return API methods', t => {
	const api = styleguidist(require('./data/styleguide.config.js'));
	t.truthy(api);
	t.is(typeof api.build, 'function');
	t.is(typeof api.server, 'function');
	t.is(typeof api.makeWebpackConfig, 'function');
});

test('makeWebpackConfig should return development Webpack config', t => {
	const api = styleguidist({ components: '*.js' });
	const result = api.makeWebpackConfig('development');
	t.truthy(result);
	t.is(result.output.filename, 'build/bundle.js');
	t.true(result.cache);
});

test('makeWebpackConfig should return production Webpack config', t => {
	const api = styleguidist({ components: '*.js' });
	const result = api.makeWebpackConfig('production');
	t.truthy(result);
	t.is(result.output.filename, 'build/bundle.js');
	t.false(result.cache);
});

test('makeWebpackConfig should merge webpackConfig config option', t => {
	const api = styleguidist({
		components: '*.js',
		webpackConfig: {
			resolve: {
				extensions: ['.scss'],
			},
		},
	});
	const result = api.makeWebpackConfig();

	t.truthy(result);
	t.deepEqual(result.resolve.extensions, ['.js', '.jsx', '.json', '.scss']);
});


test('makeWebpackConfig should merge webpackConfig but ignore output, resolveLoader sections', t => {
	const defaultWebpackConfig = styleguidist({ components: '*.js' }).makeWebpackConfig();
	const api = styleguidist({
		components: '*.js',
		webpackConfig: {
			resolve: {
				extensions: ['.scss'],
			},
			output: {
				filename: 'broken.js',
			},
			resolveLoader: {
				moduleExtensions: ['.nope'],
			},
		},
	});
	const result = api.makeWebpackConfig();

	t.deepEqual(result.output.filename, defaultWebpackConfig.output.filename);
	t.deepEqual(result.resolveLoader.moduleExtensions, defaultWebpackConfig.resolveLoader.moduleExtensions);
});

test('makeWebpackConfig should merge webpackConfig config option as a function', t => {
	const api = styleguidist({
		components: '*.js',
		webpackConfig: env => ({
			resolve: {
				extensions: [env],
			},
		}),
	});
	const result = api.makeWebpackConfig();

	t.truthy(result);
	t.deepEqual(result.resolve.extensions, ['.js', '.jsx', '.json', 'production']);
});

test('makeWebpackConfig should apply updateWebpackConfig config option', t => {
	const api = styleguidist({
		components: '*.js',
		updateWebpackConfig: (webpackConfig, env) => {
			webpackConfig.resolve.extensions.push(env);
			return webpackConfig;
		},
	});
	const result = api.makeWebpackConfig();

	t.truthy(result);
	t.deepEqual(result.resolve.extensions, ['.js', '.jsx', '.json', 'production']);
});
