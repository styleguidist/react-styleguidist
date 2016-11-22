import test from 'ava';
import { readFileSync } from 'fs';
import styleguideLoader from '../loaders/styleguide.loader';

test('should return valid, parsable JS', t => {
	const file = 'components/Button/Button.js';
	const result = styleguideLoader.pitch.call({
		addContextDependency: () => {},
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
	t.truthy(result);
	t.notThrows(() => new Function(result), SyntaxError);  // eslint-disable-line no-new-func
});

test('should return correct component paths: glob', t => {
	const file = 'components/Button/Button.js';
	const result = styleguideLoader.pitch.call({
		addContextDependency: () => {},
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
	t.truthy(result);
	t.notThrows(() => new Function(result), SyntaxError);  // eslint-disable-line no-new-func
	t.true(result.includes(`'filepath': "${__dirname}/components/Button/Button.js"`));
	t.true(result.includes(`'filepath': "${__dirname}/components/Placeholder/Placeholder.js"`));
});

test('should return correct component paths: function returning absolute paths', t => {
	const file = 'components/Button/Button.js';
	const result = styleguideLoader.pitch.call({
		addContextDependency: () => {},
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
	t.truthy(result);
	t.notThrows(() => new Function(result), SyntaxError);  // eslint-disable-line no-new-func
	t.true(result.includes(`'filepath': "${__dirname}/components/Button/Button.js"`));
	t.true(result.includes(`'filepath': "${__dirname}/components/Placeholder/Placeholder.js"`));
});

test('should return correct component paths: function returning relative paths', t => {
	const file = 'components/Button/Button.js';
	const result = styleguideLoader.pitch.call({
		addContextDependency: () => {},
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
	t.truthy(result);
	t.notThrows(() => new Function(result), SyntaxError);  // eslint-disable-line no-new-func
	t.true(result.includes(`'filepath': "${__dirname}/components/Button/Button.js"`));
	t.true(result.includes(`'filepath': "${__dirname}/components/Placeholder/Placeholder.js"`));
});
