import test from 'ava';
import { readFileSync } from 'fs';
import styleguideLoader from '../loaders/styleguide.loader';

test('should return valid, parsable JS', t => {
	const file = 'components/Button/Button.js';
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
	t.truthy(result);
	t.notThrows(() => new Function(result), SyntaxError);  // eslint-disable-line no-new-func
});
