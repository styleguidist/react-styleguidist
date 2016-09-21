import test from 'ava';
import styleguidist from '../scripts';

test('should have API methods', t => {
	t.truthy(styleguidist);
	t.is(typeof styleguidist.build, 'function');
	t.is(typeof styleguidist.server, 'function');
	t.is(typeof styleguidist.makeWebpackConfig, 'function');
});

test('makeWebpackConfig should return development Webpack config', t => {
	const result = styleguidist.makeWebpackConfig({ components: '*.js' }, 'development');
	t.truthy(result);
	t.is(result.output.filename, 'build/bundle.js');
	t.true(result.cache);
});

test('makeWebpackConfig should return production Webpack config', t => {
	const result = styleguidist.makeWebpackConfig({ components: '*.js' }, 'production');
	t.truthy(result);
	t.is(result.output.filename, 'build/bundle.js');
	t.false(result.cache);
});
