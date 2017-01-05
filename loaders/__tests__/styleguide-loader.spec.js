import vm from 'vm';
import path from 'path';
import { readFileSync } from 'fs';
import noop from 'lodash/noop';
import styleguideLoader from '../styleguide-loader';

const file = './test/components/Button/Button.js';

/* eslint-disable quotes */

it('should return valid, parsable JS', () => {
	const result = styleguideLoader.pitch.call({
		request: file,
		options: {
			styleguidist: {
				components: '../../test/components/**/*.js',
				sections: [],
				configDir: __dirname,
				getExampleFilename: () => 'Readme.md',
				getComponentPathLine: filepath => filepath,
			},
		},
		addContextDependency: noop,
	}, readFileSync(file, 'utf8'));
	expect(result).toBeTruthy();
	expect(new vm.Script(result)).not.toThrowError(SyntaxError);
});

it('should throw when components not found', () => {
	const fn = () => styleguideLoader.pitch.call({
		request: file,
		options: {
			styleguidist: {
				components: 'pizza/*.js',
				sections: [],
				configDir: __dirname,
			},
		},
		addContextDependency: noop,
	}, readFileSync(file, 'utf8'));
	expect(fn).toThrowError('No components found');
});

it('should return correct component paths: glob', () => {
	const result = styleguideLoader.pitch.call({
		request: file,
		options: {
			styleguidist: {
				components: 'components/**/*.js',
				sections: [],
				configDir: path.resolve(__dirname, '../../test'),
				getExampleFilename: () => 'Readme.md',
				getComponentPathLine: filepath => filepath,
			},
		},
		addContextDependency: noop,
	}, readFileSync(file, 'utf8'));
	expect(result).toBeTruthy();
	expect(new vm.Script(result)).not.toThrowError(SyntaxError);
	expect(result.includes(`'filepath': 'components/Button/Button.js'`)).toBe(true);
	expect(result.includes(`'filepath': 'components/Placeholder/Placeholder.js'`)).toBe(true);
});

it('should return correct component paths: function returning absolute paths', () => {
	const result = styleguideLoader.pitch.call({
		request: file,
		options: {
			styleguidist: {
				components: () => ([
					`${__dirname}/components/Button/Button.js`,
					`${__dirname}/components/Placeholder/Placeholder.js`,
				]),
				sections: [],
				configDir: __dirname,
				getExampleFilename: () => 'Readme.md',
				getComponentPathLine: filepath => filepath,
			},
		},
		addContextDependency: noop,
	}, readFileSync(file, 'utf8'));
	expect(result).toBeTruthy();
	expect(new vm.Script(result)).not.toThrowError(SyntaxError);
	expect(result.includes(`'filepath': 'components/Button/Button.js'`)).toBe(true);
	expect(result.includes(`'filepath': 'components/Placeholder/Placeholder.js'`)).toBe(true);
});

it('should return correct component paths: function returning relative paths', () => {
	const result = styleguideLoader.pitch.call({
		request: file,
		options: {
			styleguidist: {
				components: () => ([
					'components/Button/Button.js',
					'components/Placeholder/Placeholder.js',
				]),
				sections: [],
				configDir: __dirname,
				getExampleFilename: () => 'Readme.md',
				getComponentPathLine: filepath => filepath,
			},
		},
		addContextDependency: noop,
	}, readFileSync(file, 'utf8'));
	expect(result).toBeTruthy();
	expect(new vm.Script(result)).not.toThrowError(SyntaxError);
	expect(result.includes(`'filepath': 'components/Button/Button.js'`)).toBe(true);
	expect(result.includes(`'filepath': 'components/Placeholder/Placeholder.js'`)).toBe(true);
});
