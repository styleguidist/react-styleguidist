import test from 'ava';
import { toCode, requireIt } from '../loaders/utils/js';

test('toCode() should convert JavaScript object to string', t => {
	const result = toCode({
		num: 42,
		drink: JSON.stringify('coffee'),
		js: n => n * n,
	});
	t.is(result, "{'num': 42,\n'drink': \"coffee\",\n'js': function js(n) {\n\t\t\treturn n * n;\n\t\t}}");
});

test('toCode() should convert JavaScript array to string', t => {
	const result = toCode([
		42,
		JSON.stringify('coffee'),
		n => n * n,
	]);
	t.is(result, '[42,\n"coffee",\nfunction (n) {\n\t\treturn n * n;\n\t}]');
});

test('requireIt() should return a require statement', t => {
	const result = requireIt('foo');
	t.is(result, 'require("foo")');
});
