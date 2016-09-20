import test from 'ava';
import getConfig from '../scripts/config';

test('should find a config file', t => {
	const result = getConfig({ config: 'data/styleguide.config.js' });

	t.truthy(result);
	t.is(result.title, 'React Style Guide Example');
});
