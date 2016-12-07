import fs from 'fs';
import path from 'path';
import getConfig from '../scripts/config';

const cwd = process.cwd();
afterEach(() => {
	process.chdir(cwd);
});

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

it('should throw when passed config file not found', () => {
	const fn = () => getConfig({ config: 'pizza' });
	expect(fn).toThrow();
});

it('should find config file automatically', () => {
	process.chdir('test/data');
	const result = getConfig({});
	expect(result).toBeTruthy();
	expect(result.title).toBe('React Style Guide Example');
});

it('should throw when default config file not found', () => {
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

it('should throw if config has errors', () => {
	const fn = () => getConfig({
		components: 42,
	});
	expect(fn).toThrowError('should be string or function');
});

it('should have default getExampleFilename implementation', () => {
	const result = getConfig({
		components: '*.js',
	});
	expect(typeof result.getExampleFilename).toEqual('function');
	expect(result.getExampleFilename('components/Button.js')).toEqual('components/Readme.md');
});

it('should have default getComponentPathLine implementation', () => {
	const result = getConfig({
		components: '*.js',
	});
	expect(typeof result.getComponentPathLine).toEqual('function');
	expect(result.getComponentPathLine('components/Button.js')).toEqual('components/Button.js');
});

it('should absolutize assetsDir if it exists', () => {
	const result = getConfig({
		components: '*.js',
		assetsDir: 'test',
	});
	expect(result.assetsDir).toEqual(__dirname);
});

it('should throw if assetsDir does not exist', () => {
	const fn = () => getConfig({
		components: '*.js',
		assetsDir: 'pizza',
	});
	expect(fn).toThrow();
});

it('should use embedded default example template if defaultExample=true', () => {
	const result = getConfig({
		components: '*.js',
		defaultExample: true,
	});
	expect(typeof result.defaultExample).toEqual('string');
	expect(fs.existsSync(result.defaultExample)).toBeTruthy();
});

it('should absolutize defaultExample if it is a string', () => {
	const result = getConfig({
		components: '*.js',
		defaultExample: 'test/components/Button/Readme.md',
	});
	expect(result.defaultExample[0]).toEqual('/');
});

it('should throw if defaultExample does not exist', () => {
	const fn = () => getConfig({
		components: '*.js',
		defaultExample: 'pizza',
	});
	expect(fn).toThrowError('does not exist');
});

it('should throw if config has no components and sections options', () => {
	const fn = () => getConfig({
		config: path.join(__dirname, 'data/badconfig.config.js'),
	});
	expect(fn).toThrowError('"components" or "sections" option is required');
});
