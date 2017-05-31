import vm from 'vm';
import path from 'path';
import { readFileSync } from 'fs';
import styleguideLoader from '../styleguide-loader';
import getConfig from '../../scripts/config';

const file = './test/components/Button/Button.js';

/* eslint-disable quotes */

it('should return valid, parsable JS', () => {
	const result = styleguideLoader.pitch.call(
		{
			request: file,
			_styleguidist: {
				sections: [{ components: '../../test/components/**/*.js' }],
				configDir: __dirname,
				getExampleFilename: () => 'Readme.md',
				getComponentPathLine: filepath => filepath,
			},
			addContextDependency: () => {},
		},
		readFileSync(file, 'utf8')
	);
	expect(result).toBeTruthy();
	expect(() => new vm.Script(result)).not.toThrow();
});

it('should return correct component paths: default glob pattern', () => {
	const result = styleguideLoader.pitch.call(
		{
			request: file,
			_styleguidist: {
				...getConfig(),
				configDir: path.resolve(__dirname, '../../examples/cra'),
			},
			addContextDependency: () => {},
		},
		readFileSync(file, 'utf8')
	);
	expect(result).toBeTruthy();
	expect(() => new vm.Script(result)).not.toThrow();
	expect(result).toMatch(`'filepath': 'src/components/Button.js'`);
	expect(result).toMatch(`'filepath': 'src/components/Placeholder.js'`);
	expect(result).toMatch(`'filepath': 'src/components/RandomButton.js'`);
});

it('should return correct component paths: glob', () => {
	const result = styleguideLoader.pitch.call(
		{
			request: file,
			_styleguidist: {
				sections: [{ components: 'components/**/*.js' }],
				configDir: path.resolve(__dirname, '../../test'),
				getExampleFilename: () => 'Readme.md',
				getComponentPathLine: filepath => filepath,
			},
			addContextDependency: () => {},
		},
		readFileSync(file, 'utf8')
	);
	expect(result).toBeTruthy();
	expect(() => new vm.Script(result)).not.toThrow();
	expect(result).toMatch(`'filepath': 'components/Button/Button.js'`);
	expect(result).toMatch(`'filepath': 'components/Placeholder/Placeholder.js'`);
});

it('should return correct component paths: function returning absolute paths', () => {
	const result = styleguideLoader.pitch.call(
		{
			request: file,
			_styleguidist: {
				sections: [
					{
						components: () => [
							`${__dirname}/components/Button/Button.js`,
							`${__dirname}/components/Placeholder/Placeholder.js`,
						],
					},
				],
				configDir: __dirname,
				getExampleFilename: () => 'Readme.md',
				getComponentPathLine: filepath => filepath,
			},
			addContextDependency: () => {},
		},
		readFileSync(file, 'utf8')
	);
	expect(result).toBeTruthy();
	expect(() => new vm.Script(result)).not.toThrow();
	expect(result).toMatch(`'filepath': 'components/Button/Button.js'`);
	expect(result).toMatch(`'filepath': 'components/Placeholder/Placeholder.js'`);
});

it('should return correct component paths: function returning relative paths', () => {
	const result = styleguideLoader.pitch.call(
		{
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
				configDir: __dirname,
				getExampleFilename: () => 'Readme.md',
				getComponentPathLine: filepath => filepath,
			},
			addContextDependency: () => {},
		},
		readFileSync(file, 'utf8')
	);
	expect(result).toBeTruthy();
	expect(() => new vm.Script(result)).not.toThrow();
	expect(result).toMatch(`'filepath': 'components/Button/Button.js'`);
	expect(result).toMatch(`'filepath': 'components/Placeholder/Placeholder.js'`);
});

it('should filter out components without examples if skipComponentsWithoutExample=true', () => {
	const result = styleguideLoader.pitch.call(
		{
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
				configDir: path.resolve(__dirname, '../../test'),
				skipComponentsWithoutExample: true,
				getExampleFilename: componentPath => path.join(path.dirname(componentPath), 'Readme.md'),
				getComponentPathLine: filepath => filepath,
			},
			addContextDependency: () => {},
		},
		readFileSync(file, 'utf8')
	);
	expect(result).toBeTruthy();
	expect(() => new vm.Script(result)).not.toThrow();
	expect(result).toMatch(`'filepath': 'components/Button/Button.js'`);
	expect(result.includes('RandomButton.js')).toBeFalsy();
});

it('should add context dependencies to webpack from contextDependencies config option', () => {
	const contextDependencies = ['foo', 'bar'];
	const addContextDependency = jest.fn();
	styleguideLoader.pitch.call(
		{
			request: file,
			_styleguidist: {
				sections: [{ components: 'components/**/*.js' }],
				configDir: __dirname,
				contextDependencies,
			},
			addContextDependency,
		},
		readFileSync(file, 'utf8')
	);
	expect(addContextDependency).toHaveBeenCalledTimes(2);
	expect(addContextDependency).toBeCalledWith(contextDependencies[0]);
	expect(addContextDependency).toBeCalledWith(contextDependencies[1]);
});

it('should add common parent folder of all components to context dependencies', () => {
	const addContextDependency = jest.fn();
	styleguideLoader.pitch.call(
		{
			request: file,
			_styleguidist: {
				sections: [{ components: 'components/**/*.js' }],
				configDir: path.resolve(__dirname, '../../test'),
				getExampleFilename: () => 'Readme.md',
				getComponentPathLine: filepath => filepath,
			},
			addContextDependency,
		},
		readFileSync(file, 'utf8')
	);
	expect(addContextDependency).toHaveBeenCalledTimes(1);
	expect(addContextDependency).toBeCalledWith(expect.stringMatching(/test\/components\/$/));
});
