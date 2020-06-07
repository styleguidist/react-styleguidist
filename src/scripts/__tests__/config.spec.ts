import fs from 'fs';
import path from 'path';
import getConfig from '../config';

const cwd = process.cwd();
const configDir = path.resolve(__dirname, '../../../test/apps/defaults');
beforeEach(() => {
	process.chdir(configDir);
});
afterAll(() => {
	process.chdir(cwd);
});

it('should read a config file', async () => {
	const result = await getConfig('../basic/styleguide.config.js');
	expect(result).toMatchObject({ title: 'React Style Guide Example' });
});

it('should accept absolute path', async () => {
	const result = await getConfig(
		path.join(__dirname, '../../../test/apps/basic/styleguide.config.js')
	);
	expect(result).toMatchObject({ title: 'React Style Guide Example' });
});

it('should throw when passed config file not found', () => {
	expect(getConfig('pizza')).rejects.toThrow();
});

it('should find config file automatically', async () => {
	process.chdir('../basic');
	const result = await getConfig();
	expect(result).toMatchObject({ title: 'React Style Guide Example' });
});

it('should accept config as an object', async () => {
	const result = await getConfig({
		title: 'Style guide',
	});
	expect(result).toMatchObject({ title: 'Style guide' });
});

it('should throw if config has errors', async () => {
	expect.assertions(1);
	try {
		await getConfig({
			components: 42,
		} as any);
	} catch (err) {
		expect(err.message).toMatch('should be string, function, or array');
	}
});

it('should change the config using the update callback', async () => {
	const result = await getConfig(
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

it('should have default getExampleFilename implementation', async () => {
	const result = await getConfig();
	expect(typeof result.getExampleFilename).toEqual('function');
});

it('default getExampleFilename should return Readme.md path if it exists', async () => {
	process.chdir('../..');
	const result = await getConfig();
	expect(result.getExampleFilename(path.resolve('components/Button/Button.js'))).toEqual(
		path.resolve('components/Button/Readme.md')
	);
});

it('default getExampleFilename should return Component.md path if it exists', async () => {
	process.chdir('../..');
	const result = await getConfig();
	expect(result.getExampleFilename(path.resolve('components/Placeholder/Placeholder.js'))).toEqual(
		path.resolve('components/Placeholder/Placeholder.md')
	);
});

it('default getExampleFilename should return Component.md path if it exists with index.js', async () => {
	process.chdir('../..');
	const result = await getConfig();
	result.components = './components/**/*.js';
	expect(result.getExampleFilename(path.resolve('components/Label/index.js'))).toEqual(
		path.resolve('components/Label/Label.md')
	);
});

it('default getExampleFilename should return false if no examples file found', async () => {
	process.chdir('../..');
	const result = await getConfig();
	expect(
		result.getExampleFilename(path.resolve('components/RandomButton/RandomButton.js'))
	).toBeFalsy();
});

it('should have default getComponentPathLine implementation', async () => {
	const result = await getConfig();
	expect(typeof result.getComponentPathLine).toEqual('function');
	expect(result.getComponentPathLine('components/Button.js')).toEqual('components/Button.js');
});

it('should have default title based on package.json name', async () => {
	const result = await getConfig();
	expect(result.title).toEqual('Pizza Style Guide');
});

it('configDir option should be a directory of a passed config', async () => {
	const result = await getConfig(path.join(configDir, 'styleguide.config.js'));
	expect(result).toMatchObject({ configDir });
});

it('configDir option should be a current directory if the config was passed as an object', async () => {
	const result = await getConfig();
	expect(result).toMatchObject({ configDir: process.cwd() });
});

it('should absolutize assetsDir if it exists', async () => {
	const assetsDir = 'src/components';
	const result = await getConfig({
		assetsDir,
	});
	expect(result.assetsDir).toEqual(path.join(configDir, assetsDir));
});

it('should throw if assetsDir does not exist', () => {
	expect(
		getConfig({
			assetsDir: 'pizza',
		})
	).rejects.toThrow();
});

it('should use embedded default example template if defaultExample=true', async done => {
	const result = await getConfig({
		defaultExample: true,
	});
	expect(typeof result.defaultExample).toEqual('string');
	if (typeof result.defaultExample === 'string') {
		expect(fs.existsSync(result.defaultExample)).toBeTruthy();
	} else {
		done.fail();
	}
	done();
});

it('should absolutize defaultExample if it is a string', async () => {
	const result = await getConfig({
		defaultExample: 'src/components/Button.md',
	});
	expect(result.defaultExample).toMatch(/^\//);
});

it('should throw if defaultExample does not exist', async () => {
	expect.assertions(1);
	try {
		await getConfig({
			defaultExample: 'pizza',
		});
	} catch (err) {
		expect(err.message).toMatch('does not exist');
	}
});

it('should use components option as the first sections if there’s no sections option', async () => {
	const components = 'components/*/*.js';
	const result = await getConfig({
		components,
	});
	expect(result.sections).toHaveLength(1);
	expect(result.sections[0].components).toEqual(components);
});

it('should use default components option both components and sections options weren’t specified', async () => {
	const result = await getConfig();
	expect(result.sections).toHaveLength(1);
	expect(result.sections[0].components).toMatch('**');
});

it('should ignore components option there’s sections options', async () => {
	const components = 'components/*/*.js';
	const result = await getConfig({
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

it('should return webpackConfig option as is', async () => {
	const webpackConfig = { foo: 42 };
	const result = await getConfig({
		webpackConfig,
	});
	expect(result.webpackConfig).toEqual(webpackConfig);
});

it('should return webpackConfig with user webpack config', async () => {
	process.chdir('../basic');
	const result = await getConfig();
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
	const fn = async () => await getConfig();
	expect(fn).not.toThrow();
});

it('should throw when old template as a string option passed', async () => {
	expect.assertions(1);
	try {
		await getConfig({
			template: 'pizza',
		});
	} catch (err) {
		expect(err.message).toMatch('format has been changed');
	}
});

it('should throw when editorConfig option passed', async () => {
	expect.assertions(1);
	try {
		await getConfig({
			editorConfig: { theme: 'foo' },
		});
	} catch (err) {
		expect(err.message).toMatch('config option was removed');
	}
});

it('mountPointId should have default value', async () => {
	const result = await getConfig();
	expect(result.mountPointId).toEqual('rsg-root');
});

it('mountPointId should have default value', async () => {
	const result = await getConfig();
	expect(result.mountPointId).toEqual('rsg-root');
});

it('should set the exampleMode to expand if the flag showCode is on', async () => {
	const result = await getConfig({
		showCode: true,
	});
	expect(result.exampleMode).toBe('expand');
});

it('should set the exampleMode to collapse if the flag showCode is off', async () => {
	const result = await getConfig({
		showCode: false,
	});
	expect(result.exampleMode).toBe('collapse');
});

it('should set the usageMode to expand if the flag showUsage is on', async () => {
	const result = await getConfig({
		showUsage: true,
	});
	expect(result.usageMode).toBe('expand');
});

it('should set the usageMode to collapse if the flag showUsage is off', async () => {
	const result = await getConfig({
		showUsage: false,
	});
	expect(result.usageMode).toBe('collapse');
});
