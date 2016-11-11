import test from 'ava';
import { readFileSync } from 'fs';
import propsLoader from '../loaders/props.loader';

test('should return valid, parsable JS', t => {
	const file = 'components/Button/Button.js';
	const result = propsLoader.call({
		request: file,
		options: {
			styleguidist: {},
		},
	}, readFileSync(file, 'utf8'));
	t.truthy(result);
	t.notThrows(() => new Function(result), SyntaxError);  // eslint-disable-line no-new-func
});

test('should extract doclets', t => {
	const file = 'components/Placeholder/Placeholder.js';
	const result = propsLoader.call({
		request: file,
		options: {
			styleguidist: {},
		},
	}, readFileSync(file, 'utf8'));
	t.truthy(result);
	t.notThrows(() => new Function(result), SyntaxError);  // eslint-disable-line no-new-func
	t.true(result.includes('require("examples!./examples.md")'));
});
