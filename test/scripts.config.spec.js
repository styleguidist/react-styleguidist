import path from 'path';
import getConfig from '../scripts/config';

it('should read a config file', () => {
	const result = getConfig({ config: './test/data/styleguide.config.js' });
	expect(result).toBeTruthy();
	expect(result.title).toBe('React Style Guide Example');
});

it('should accept absolute path', () => {
	const result = getConfig({ config: path.join(__dirname, 'data/styleguide.config.js') });
	expect(result).toBeTruthy();
	expect(result.title).toBe('React Style Guide Example');
});

it('should throw when config file not found', () => {
	const fn = () => getConfig({});
	expect(fn).toThrow();
});

it('should accept config as an object', () => {
	const result = getConfig({
		components: '*.js',
	});
	expect(result).toBeTruthy();
	expect(result.title).toBe('Style guide');
});
