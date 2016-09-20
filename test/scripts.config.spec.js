import test from 'ava';
import getConfig from '../scripts/config';

test('should read a config file', t => {
	const result = getConfig({ config: 'data/styleguide.config.js' });
	t.truthy(result);
	t.is(result.title, 'React Style Guide Example');
});

test('should throw when config file not found', t => {
	const fn = () => getConfig({});
	t.throws(fn);
});

test('should accept config as an object', t => {
	const result = getConfig({
		components: [],
	});
	t.truthy(result);
	t.is(result.title, 'Style guide');
});
