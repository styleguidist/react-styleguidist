import vm from 'vm';
import { readFileSync } from 'fs';
import styleguideLoader from '../loaders/styleguide-loader';

const file = './test/components/Button/Button.js';

/* eslint-disable quotes */

it('should return valid, parsable JS', () => {
	const result = styleguideLoader.pitch.call({
		request: file,
		options: {
			styleguidist: {
				components: 'components/**/*.js',
				configDir: __dirname,
				getExampleFilename: () => 'Readme.md',
				getComponentPathLine: filepath => filepath,
			},
		},
	}, readFileSync(file, 'utf8'));
	expect(result).toBeTruthy();
	expect(new vm.Script(result)).not.toThrowError(SyntaxError);
});

it('should return correct component paths: glob', () => {
	const result = styleguideLoader.pitch.call({
		request: file,
		options: {
			styleguidist: {
				components: 'components/**/*.js',
				configDir: __dirname,
				getExampleFilename: () => 'Readme.md',
				getComponentPathLine: filepath => filepath,
			},
		},
	}, readFileSync(file, 'utf8'));
	expect(result).toBeTruthy();
	expect(new vm.Script(result)).not.toThrowError(SyntaxError);
	expect(result.includes(`'filepath': "components/Button/Button.js"`)).toBe(true);
	expect(result.includes(`'filepath': "components/Placeholder/Placeholder.js"`)).toBe(true);
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
				configDir: __dirname,
				getExampleFilename: () => 'Readme.md',
				getComponentPathLine: filepath => filepath,
			},
		},
	}, readFileSync(file, 'utf8'));
	expect(result).toBeTruthy();
	expect(new vm.Script(result)).not.toThrowError(SyntaxError);
	expect(result.includes(`'filepath': "components/Button/Button.js"`)).toBe(true);
	expect(result.includes(`'filepath': "components/Placeholder/Placeholder.js"`)).toBe(true);
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
				configDir: __dirname,
				getExampleFilename: () => 'Readme.md',
				getComponentPathLine: filepath => filepath,
			},
		},
	}, readFileSync(file, 'utf8'));
	expect(result).toBeTruthy();
	expect(new vm.Script(result)).not.toThrowError(SyntaxError);
	expect(result.includes(`'filepath': "components/Button/Button.js"`)).toBe(true);
	expect(result.includes(`'filepath': "components/Placeholder/Placeholder.js"`)).toBe(true);
});
