import fs from 'fs';
import path from 'path';
import getConfig from '../config';

const cwd = process.cwd();
const configDir = path.resolve(__dirname, '../../test/apps/defaults');
beforeEach(() => {
	process.chdir(configDir);
});
afterAll(() => {
	process.chdir(cwd);
});

it('should read a config file', () => {
	const result = getConfig('../basic/styleguide.config.js');
	expect(result).toMatchObject({ title: 'React Style Guide Example' });
});

it('should accept absolute path', () => {
	const result = getConfig(path.join(__dirname, '../../test/apps/basic/styleguide.config.js'));
	expect(result).toMatchObject({ title: 'React Style Guide Example' });
});

it('should throw when passed config file not found', () => {
	const fn = () => getConfig('pizza');
	expect(fn).toThrow();
});

it('should find config file automatically', () => {
	process.chdir('../basic');
	const result = getConfig();
	expect(result).toMatchObject({ title: 'React Style Guide Example' });
});

it('should accept config as an object', () => {
	const result = getConfig({
		title: 'Style guide',
	});
	expect(result).toMatchObject({ title: 'Style guide' });
});

it('should throw if config has errors', () => {
	const fn = () =>
		getConfig({
			components: 42,
		});
	expect(fn).toThrowError('should be string, function, or array');
});

it('should change the config using the update callback', () => {
	const result = getConfig(
		{
			title: 'Style guide',
		},
		config => {
			config.title = 'Pizza';
			return config;
		}
	);
	expect(result).toMatchObject({ title: 'Pizza' });
});

it('should have default getExampleFilename implementation', () => {
	const result = getConfig();
	expect(typeof result.getExampleFilename).toEqual('function');
});

it('default getExampleFilename should return Readme.md path if it exists', () => {
	process.chdir('../..');
	const result = getConfig();
	expect(result.getExampleFilename(path.resolve('components/Button/Button.js'))).toEqual(
		path.resolve('components/Button/Readme.md')
	);
});

it('default getExampleFilename should return Component.md path if it exists', () => {
	process.chdir('../..');
	const result = getConfig();
	expect(result.getExampleFilename(path.resolve('components/Placeholder/Placeholder.js'))).toEqual(
		path.resolve('components/Placeholder/Placeholder.md')
	);
});

it('default getExampleFilename should return false if no examples file found', () => {
	process.chdir('../..');
	const result = getConfig();
	expect(
		result.getExampleFilename(path.resolve('components/RandomButton/RandomButton.js'))
	).toBeFalsy();
});

it('should have default getComponentPathLine implementation', () => {
	const result = getConfig();
	expect(typeof result.getComponentPathLine).toEqual('function');
	expect(result.getComponentPathLine('components/Button.js')).toEqual('components/Button.js');
});

it('should have default title based on package.json name', () => {
	const result = getConfig();
	expect(result.title).toEqual('Pizza Style Guide');
});

it('configDir option should be a directory of a passed config', () => {
	const result = getConfig(path.join(configDir, 'styleguide.config.js'));
	expect(result).toMatchObject({ configDir });
});

it('configDir option should be a current directory if the config was passed as an object', () => {
	const result = getConfig();
	expect(result).toMatchObject({ configDir: process.cwd() });
});

it('should absolutize assetsDir if it exists', () => {
	const assetsDir = 'src/components';
	const result = getConfig({
		assetsDir,
	});
	expect(result.assetsDir).toEqual(path.join(configDir, assetsDir));
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
		defaultExample: 'src/components/Button.md',
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
	const components = 'components/*/*.js';
	const result = getConfig({
		components,
	});
	expect(result.sections).toHaveLength(1);
	expect(result.sections[0].components).toEqual(components);
});

it('should use default components option both components and sections options weren’t specified', () => {
	const result = getConfig();
	expect(result.sections).toHaveLength(1);
	expect(result.sections[0].components).toMatch('**');
});

it('should ignore components option there’s sections options', () => {
	const components = 'components/*/*.js';
	const result = getConfig({
		components: 'components/Button/*.js',
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
	process.chdir('../basic');
	const result = getConfig();
	expect(result.webpackConfig).toEqual(
		expect.objectContaining({
			module: {
				rules: expect.any(Array),
			},
		})
	);
});

it('should allow no webpack config', () => {
	process.chdir('../no-webpack');
	const fn = () => getConfig();
	expect(fn).not.toThrow();
});

it('editorConfig option should have default values', () => {
	const result = getConfig();
	expect(result.editorConfig).toHaveProperty('mode', 'jsx');
	expect(result.editorConfig).toHaveProperty('theme', 'base16-light');
});

it('should merge default editorConfig with options provided by the user', () => {
	const result = getConfig({
		editorConfig: {
			mode: 'js',
		},
	});

	expect(result.editorConfig).toHaveProperty('mode', 'js');
	expect(result.editorConfig).toHaveProperty('theme', 'base16-light');
});

it('should throw when old template as a string option passed', () => {
	const fn = () =>
		getConfig({
			template: 'pizza',
		});
	expect(fn).toThrow('format has been changed');
});

it('mountPointId should have default value', () => {
	const result = getConfig();
	expect(result.mountPointId).toEqual('rsg-root');
});
