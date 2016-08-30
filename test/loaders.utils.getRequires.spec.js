import test from 'ava';
import getRequires, {
	REQUIRE_ANYTHING_BASE,
	REQUIRE_ANYTHING_REGEX,
	SIMPLE_STRING_REGEX,
} from '../loaders/utils/getRequires';

/* eslint-disable quotes */

// REQUIRE_ANYTHING_REGEX

const regex = new RegExp(REQUIRE_ANYTHING_BASE);

test('should match require invocations', t => {
	t.regex(`require("foo")`, regex);
	t.regex(`require ( "foo" )`, regex);
	t.regex(`require('foo')`, regex);
	t.regex(`require(foo)`, regex);
	t.regex(`require("f" + "o" + "o")`, regex);
	t.regex(`require("f" + ("o" + "o"))`, regex);
	t.regex(`function f() { require("foo"); }`, regex);
});

test('should not match other occurrences of require', t => {
	t.notRegex(`"required field"`, regex);
	t.notRegex(`var f = require;`, regex);
	t.notRegex(`require.call(module, "foo")`, regex);
});

test('should match many requires in the same line correctly', t => {
	const replaced = `require('foo');require('bar')`.replace(REQUIRE_ANYTHING_REGEX, 'x');
	t.is(replaced, 'x;x');
});

// SIMPLE_STRING_REGEX

test('should match simple strings and nothing else', t => {
	const regex = SIMPLE_STRING_REGEX;

	t.regex(`"foo"`, regex);
	t.regex(`'foo'`, regex);
	t.regex(`"fo'o"`, regex);
	t.regex(`'fo"o'`, regex);
	t.regex(`'.,:;!§$&/()=@^12345'`, regex);

	t.notRegex(`foo`, regex);
	t.notRegex(`'foo"`, regex);
	t.notRegex(`"foo'`, regex);

	// These 2 are actually valid in JS, but don't work with this regex.
	// But you shouldn't be using these in your requires anyway.
	t.notRegex(`"fo\\"o"`, regex);
	t.notRegex(`'fo\\'o'`, regex);

	t.notRegex(`"foo" + "bar"`, regex);
});

// getRequires

test('should find calls to require in code', t => {
	t.deepEqual(getRequires(`require('foo')`), ['foo']);
	t.deepEqual(getRequires(`require('./foo')`), ['./foo']);
	t.deepEqual(getRequires(`require('foo');require('bar')`), ['foo', 'bar']);
	t.throws(() => getRequires(`require('foo' + 'bar')`), Error);
});
