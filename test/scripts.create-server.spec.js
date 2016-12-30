import test from 'ava';
import createServer from '../scripts/create-server';
import getConfig from '../scripts/config';

test('createServer should return an object containing a server instance', t => {
	const config = getConfig({ components: '*.js' });
	const result = createServer(config, 'production');
	t.truthy(result);
	t.truthy(result.app);
});

test('createServer should return an object containing a production Webpack compiler', t => {
	const config = getConfig({ components: '*.js' });
	const result = createServer(config, 'production');
	t.truthy(result);
	t.truthy(result.compiler);
	t.is(result.compiler.options.output.filename, 'build/bundle.js');
	t.false(result.compiler.options.cache);
});

test('createServer should return an object containing a development Webpack compiler', t => {
	const config = getConfig({ components: '*.js' });
	const result = createServer(config, 'development');
	t.truthy(result);
	t.truthy(result.compiler);
	t.is(result.compiler.options.output.filename, 'build/bundle.js');
	t.true(result.compiler.options.cache);
});
