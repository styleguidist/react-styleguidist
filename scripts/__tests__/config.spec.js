import fs from 'fs';
import path from 'path';
import getConfig from '../config';

const cwd = process.cwd();
afterEach(() => {
	process.chdir(cwd);
});

it('should read a config file', () => {
	const result = getConfig('./test/data/styleguide.config.js');
	expect(result).toBeTruthy();
	expect(result.title).toBe('React Style Guide Example');
});

it('should accept absolute path', () => {
	const result = getConfig(path.join(__dirname, '../../test/data/styleguide.config.js'));
	expect(result).toBeTruthy();
	expect(result.title).toBe('React Style Guide Example');
});

it('should throw when passed config file not found', () => {
	const fn = () => getConfig('pizza');
	expect(fn).toThrow();
});

it('should find config file automatically', () => {
	process.chdir('test/apps/basic');
	const result = getConfig({});
	expect(result).toBeTruthy();
	expect(result.title).toBe('React Style Guide Example');
});

it('should accept config as an object', () => {
	const result = getConfig({
		title: 'Style guide',
	});
	expect(result).toBeTruthy();
	expect(result.title).toBe('Style guide');
});

it('should throw if config has errors', () => {
	const fn = () =>
		getConfig({
			components: 42,
		});
	expect(fn).toThrowError('should be string or function');
});

it('should have default getExampleFilename implementation', () => {
	const result = getConfig();
	expect(typeof result.getExampleFilename).toEqual('function');
});

it('default getExampleFilename should return Readme.md path if it exists', () => {
	const result = getConfig();
	expect(result.getExampleFilename(path.resolve('test/components/Button/Button.js'))).toEqual(
		path.resolve('test/components/Button/Readme.md')
	);
});

it('default getExampleFilename should return Component.md path if it exists', () => {
	const result = getConfig();
	expect(
		result.getExampleFilename(path.resolve('test/components/Placeholder/Placeholder.js'))
	).toEqual(path.resolve('test/components/Placeholder/Placeholder.md'));
});

it('default getExampleFilename should return false if no examples file found', () => {
	const result = getConfig();
	expect(
		result.getExampleFilename(path.resolve('test/components/RandomButton/RandomButton.js'))
	).toBeFalsy();
});

it('default getExampleFilename should resolve uppercase README.md files', () => {
	const result = getConfig();
	expect(result.getExampleFilename(
		path.resolve('test/components/RandomButton2/RandomButton2.js')
	)).toEqual(
		path.resolve('test/components/RandomButton2/README.md')
	);
});

it('should have default getComponentPathLine implementation', () => {
	const result = getConfig();
	expect(typeof result.getComponentPathLine).toEqual('function');
	expect(result.getComponentPathLine('components/Button.js')).toEqual('components/Button.js');
});

it('should have default title based on package.json name', () => {
	const result = getConfig();
	expect(result.title).toEqual('React Styleguidist Style Guide');
});

it('should absolutize assetsDir if it exists', () => {
	const result = getConfig({
		assetsDir: 'scripts/__tests__',
	});
	expect(result.assetsDir).toEqual(__dirname);
});

it('should throw if assetsDir does not exist', () => {
	const fn = () =>
		getConfig({
			assetsDir: 'pizza',
		});
	expect(fn).toThrow();
});

it('should use embedded default example template if defaultExample=true', () => {
	const result = getConfig({
		defaultExample: true,
	});
	expect(typeof result.defaultExample).toEqual('string');
	expect(fs.existsSync(result.defaultExample)).toBeTruthy();
});

it('should absolutize defaultExample if it is a string', () => {
	const result = getConfig({
		defaultExample: 'test/components/Button/Readme.md',
	});
	expect(result.defaultExample[0]).toEqual('/');
});

it('should throw if defaultExample does not exist', () => {
	const fn = () =>
		getConfig({
			defaultExample: 'pizza',
		});
	expect(fn).toThrowError('does not exist');
});

it('should use components option as the first sections if there’s no sections option', () => {
	const components = 'test/components/*/*.js';
	const result = getConfig({
		components,
	});
	expect(result.sections).toHaveLength(1);
	expect(result.sections[0].components).toEqual(components);
});

it('should use default components option both components and sections options weren’t specified', () => {
	const result = getConfig();
	expect(result.sections).toHaveLength(1);
	expect(result.sections[0].components).toMatch('.js');
});

it('should ignore components option there’s sections options', () => {
	const components = 'test/components/*/*.js';
	const result = getConfig({
		components: 'test/components/Button/*.js',
		sections: [
			{
				components,
			},
		],
	});
	expect(result.sections).toHaveLength(1);
	expect(result.sections[0].components).toEqual(components);
});

it('should return webpackConfig option as is', () => {
	const webpackConfig = { foo: 42 };
	const result = getConfig({
		webpackConfig,
	});
	expect(result.webpackConfig).toEqual(webpackConfig);
});

it('should return webpackConfig with user webpack config', () => {
	process.chdir('test/apps/cra');
	const result = getConfig();
	expect(result.webpackConfig).toEqual({ cra: true });
});

it('should allow no webpack config', () => {
	process.chdir('test/apps/no-webpack');
	const fn = () => getConfig();
	expect(fn).not.toThrow();
});

describe('caching', () => {
	const readdirSync = fs.readdirSync;

	beforeEach(() => {
		fs.readdirSync = jest.fn(function() {
			return readdirSync.apply(null, arguments); // eslint-disable-line
		});
	});

	afterEach(() => {
		fs.readdirSync = readdirSync;
	});

	it('default getExampleFilename should cache filenames', () => {
		const result = getConfig();
		const filepath1 = path.resolve('test/components/RandomButton2/RandomButton1.js');
		const filepath2 = path.resolve('test/components/RandomButton2/RandomButton2.js');
		const cache = {};
		expect(result.getExampleFilename(filepath1, cache)).toEqual(
			path.resolve('test/components/RandomButton2/README.md')
		);
		expect(result.getExampleFilename(filepath2, cache)).toEqual(
			path.resolve('test/components/RandomButton2/README.md')
		);
		expect(fs.readdirSync.mock.calls.length).toBe(1);
		const cacheKeys = Object.keys(cache);
		expect(cacheKeys.length).toBe(1);
		expect(cache[cacheKeys[0]]).toEqual(['README.md', 'RandomButton2.js']);
	});
});
