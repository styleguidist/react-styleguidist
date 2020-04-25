import vm from 'vm';
import path from 'path';
import * as styleguideLoader from '../styleguide-loader';
import getConfig from '../../scripts/config';

/* eslint-disable quotes */

const file = path.resolve(__dirname, '../../../test/components/Button/Button.js');
const configDir = path.resolve(__dirname, '../../../test');

it('should return valid, parsable JS', () => {
	const result = styleguideLoader.pitch.call({
		request: file,
		_styleguidist: {
			sections: [{ components: 'components/**/*.js' }],
			configDir,
			getExampleFilename: () => 'Readme.md',
			getComponentPathLine: (filepath: string) => filepath,
		},
		addContextDependency: () => {},
	} as any);
	expect(result).toBeTruthy();
	expect(() => new vm.Script(result)).not.toThrow();
});

it('should return correct component paths: default glob pattern', () => {
	const result = styleguideLoader.pitch.call({
		request: file,
		_styleguidist: {
			...getConfig(path.resolve(__dirname, '../../../test/apps/defaults/styleguide.config.js')),
		},
		addContextDependency: () => {},
	} as any);
	expect(result).toBeTruthy();
	expect(() => new vm.Script(result)).not.toThrow();
	expect(result).toMatch(`'filepath': 'src/components/Button.js'`);
	expect(result).toMatch(`'filepath': 'src/components/Placeholder.js'`);
});

it('should return correct component paths: glob', () => {
	const result = styleguideLoader.pitch.call({
		request: file,
		_styleguidist: {
			sections: [{ components: 'components/**/*.js' }],
			configDir,
			getExampleFilename: () => 'Readme.md',
			getComponentPathLine: (filepath: string) => filepath,
		},
		addContextDependency: () => {},
	} as any);
	expect(result).toBeTruthy();
	expect(() => new vm.Script(result)).not.toThrow();
	expect(result).toMatch(`'filepath': 'components/Button/Button.js'`);
	expect(result).toMatch(`'filepath': 'components/Placeholder/Placeholder.js'`);
	expect(result).toMatch(`'filepath': 'components/RandomButton/RandomButton.js'`);
});

it('should return correct component paths: function returning absolute paths', () => {
	const result = styleguideLoader.pitch.call({
		request: file,
		_styleguidist: {
			sections: [
				{
					components: () => [
						`${configDir}/components/Button/Button.js`,
						`${configDir}/components/Placeholder/Placeholder.js`,
					],
				},
			],
			configDir,
			getExampleFilename: () => 'Readme.md',
			getComponentPathLine: (filepath: string) => filepath,
		},
		addContextDependency: () => {},
	} as any);
	expect(result).toBeTruthy();
	expect(() => new vm.Script(result)).not.toThrow();
	expect(result).toMatch(`'filepath': 'components/Button/Button.js'`);
	expect(result).toMatch(`'filepath': 'components/Placeholder/Placeholder.js'`);
	expect(result).not.toMatch(`'filepath': 'components/RandomButton/RandomButton.js'`);
});

it('should return correct component paths: function returning relative paths', () => {
	const result = styleguideLoader.pitch.call({
		request: file,
		_styleguidist: {
			sections: [
				{
					components: () => [
						'components/Button/Button.js',
						'components/Placeholder/Placeholder.js',
					],
				},
			],
			configDir,
			getExampleFilename: () => 'Readme.md',
			getComponentPathLine: (filepath: string) => filepath,
		},
		addContextDependency: () => {},
	} as any);
	expect(result).toBeTruthy();
	expect(() => new vm.Script(result)).not.toThrow();
	expect(result).toMatch(`'filepath': 'components/Button/Button.js'`);
	expect(result).toMatch(`'filepath': 'components/Placeholder/Placeholder.js'`);
	expect(result).not.toMatch(`'filepath': 'components/RandomButton/RandomButton.js'`);
});

it('should return correct component paths: array of of relative paths', () => {
	const result = styleguideLoader.pitch.call({
		request: file,
		_styleguidist: {
			sections: [
				{
					components: ['components/Button/Button.js', 'components/Placeholder/Placeholder.js'],
				},
			],
			configDir,
			getExampleFilename: () => 'Readme.md',
			getComponentPathLine: (filepath: string) => filepath,
		},
		addContextDependency: () => {},
	} as any);
	expect(result).toBeTruthy();
	expect(() => new vm.Script(result)).not.toThrow();
	expect(result).toMatch(`'filepath': 'components/Button/Button.js'`);
	expect(result).toMatch(`'filepath': 'components/Placeholder/Placeholder.js'`);
});

it('should filter out components without examples if skipComponentsWithoutExample=true', () => {
	const result = styleguideLoader.pitch.call({
		request: file,
		_styleguidist: {
			sections: [
				{
					components: () => [
						'components/Button/Button.js',
						'components/RandomButton/RandomButton.js',
					],
				},
			],
			configDir,
			skipComponentsWithoutExample: true,
			getExampleFilename: (componentPath: string) =>
				path.join(path.dirname(componentPath), 'Readme.md'),
			getComponentPathLine: (filepath: string) => filepath,
		},
		addContextDependency: () => {},
	} as any);
	expect(result).toBeTruthy();
	expect(() => new vm.Script(result)).not.toThrow();
	expect(result).toMatch(`'filepath': 'components/Button/Button.js'`);
	expect(result).not.toMatch(`'filepath': 'components/RandomButton/RandomButton.js'`);
});

it('should add context dependencies to webpack from contextDependencies config option', () => {
	const contextDependencies = ['foo', 'bar'];
	const addContextDependency = jest.fn();
	styleguideLoader.pitch.call({
		request: file,
		_styleguidist: {
			sections: [{ components: 'components/**/*.js' }],
			configDir,
			getExampleFilename: () => 'Readme.md',
			getComponentPathLine: (filepath: string) => filepath,
			contextDependencies,
		},
		addContextDependency,
	} as any);
	expect(addContextDependency).toHaveBeenCalledTimes(2);
	expect(addContextDependency).toBeCalledWith(contextDependencies[0]);
	expect(addContextDependency).toBeCalledWith(contextDependencies[1]);
});

it('should add common parent folder of all components to context dependencies', () => {
	const addContextDependency = jest.fn();
	styleguideLoader.pitch.call({
		request: file,
		_styleguidist: {
			sections: [{ components: 'components/**/*.js' }],
			configDir,
			getExampleFilename: () => 'Readme.md',
			getComponentPathLine: (filepath: string) => filepath,
		},
		addContextDependency,
	} as any);
	expect(addContextDependency).toHaveBeenCalledTimes(1);
	expect(addContextDependency).toBeCalledWith(expect.stringMatching(/test[\\/]components[\\//]$/));
});

it('should convert styles and themes as string into requireIt objects', () => {
	const result = styleguideLoader.pitch.call({
		request: file,
		_styleguidist: {
			sections: [],
			styles: 'path/to/styles',
			theme: 'path/to/theme',
		},
		addDependency: jest.fn(),
	} as any);
	expect(result).toMatch(/require\('path\/to\/styles'\)/);
	expect(result).toMatch(/require\('path\/to\/theme'\)/);
});

it('should flag both styles and theme as dependencies', () => {
	const addDependency = jest.fn();
	styleguideLoader.pitch.call({
		request: file,
		_styleguidist: {
			sections: [],
			styles: 'path/to/styles',
			theme: 'path/to/theme',
		},
		addDependency,
	} as any);
	expect(addDependency).toHaveBeenCalledWith('path/to/styles');
	expect(addDependency).toHaveBeenCalledWith('path/to/theme');
});

it('should transform styles into ES module compatible imports', () => {
	const result = styleguideLoader.pitch.call({
		request: file,
		_styleguidist: {
			sections: [],
			styles: 'path/to/styles',
		},
		addDependency: jest.fn(),
	} as any);
	expect(result).toMatchInlineSnapshot(`
		"const __rsgStyles$0 = require('path/to/styles');
		const __rsgStyles = __rsgStyles$0.default || (__rsgStyles$0['__rsgStyles'] || __rsgStyles$0);
		if (module.hot) {
			module.hot.accept([])
		}
		module.exports = {
		    'config': { 'styles': __rsgStyles },
		    'welcomeScreen': true,
		    'patterns': [],
		    'sections': []
		}
		"
	`);
});
