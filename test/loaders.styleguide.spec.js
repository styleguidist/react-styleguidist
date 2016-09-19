import test from 'ava';
import { readFileSync } from 'fs';
import styleguideLoader from '../loaders/styleguide.loader';

test('should return valid, parsable JS', t => {
	const file = '../examples/basic/lib/components/Button/Button.js';
	const result = styleguideLoader.pitch.call({
		request: file,
		options: {
			styleguidist: {},
		},
	}, readFileSync(file, 'utf8'));
	t.truthy(result);
	t.notThrows(() => new Function(result), SyntaxError);  // eslint-disable-line no-new-func
});
