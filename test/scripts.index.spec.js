import test from 'ava';
import styleguidist from '../scripts';

test('should return API methods', t => {
	const api = styleguidist(require('./data/styleguide.config.js'));
	t.truthy(api);
	t.is(typeof api.build, 'function');
	t.is(typeof api.server, 'function');
	t.is(typeof api.makeWebpackConfig, 'function');
	t.is(typeof api.createServer, 'function');
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

test('createServer should return an object containing a server instance', t => {
	const api = styleguidist({ components: '*.js' });
	const result = api.createServer('production');
	t.truthy(result);
	t.truthy(result.app);
});

test('createServer should return an object containing a production Webpack compiler', t => {
	const api = styleguidist({ components: '*.js' });
	const result = api.createServer('production');
	t.truthy(result);
	t.truthy(result.compiler);
	t.is(result.compiler.options.output.filename, 'build/bundle.js');
	t.false(result.compiler.options.cache);
});

test('createServer should return an object containing a development Webpack compiler', t => {
	const api = styleguidist({ components: '*.js' });
	const result = api.createServer('development');
	t.truthy(result);
	t.truthy(result.compiler);
	t.is(result.compiler.options.output.filename, 'build/bundle.js');
	t.true(result.compiler.options.cache);
});
