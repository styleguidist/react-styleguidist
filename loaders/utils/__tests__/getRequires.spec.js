import getRequires, {
	REQUIRE_ANYTHING_BASE,
	REQUIRE_ANYTHING_REGEX,
	SIMPLE_STRING_REGEX,
} from '../getRequires';

/* eslint-disable quotes */

// REQUIRE_ANYTHING_REGEX

const regex = new RegExp(REQUIRE_ANYTHING_BASE);

it('should match require invocations', () => {
	expect(`require("foo")`).toMatch(regex);
	expect(`require ( "foo" )`).toMatch(regex);
	expect(`require('foo')`).toMatch(regex);
	expect(`require(foo)`).toMatch(regex);
	expect(`require("f" + "o" + "o")`).toMatch(regex);
	expect(`require("f" + ("o" + "o"))`).toMatch(regex);
	expect(`function f() { require("foo"); }`).toMatch(regex);
});

it('should not match other occurrences of require', () => {
	expect(`"required field"`).not.toMatch(regex);
	expect(`var f = require;`).not.toMatch(regex);
	expect(`require.call(module, "foo")`).not.toMatch(regex);
});

it('should match many requires in the same line correctly', () => {
	const replaced = `require('foo');require('bar')`.replace(REQUIRE_ANYTHING_REGEX, 'x');
	expect(replaced).toBe('x;x');
});

// SIMPLE_STRING_REGEX

it('should match simple strings and nothing else', () => {
	const regex = SIMPLE_STRING_REGEX;

	expect(`"foo"`).toMatch(regex);
	expect(`'foo'`).toMatch(regex);
	expect(`"fo'o"`).toMatch(regex);
	expect(`'fo"o'`).toMatch(regex);
	expect(`'.,:;!§$&/()=@^12345'`).toMatch(regex);

	expect(`foo`).not.toMatch(regex);
	expect(`'foo"`).not.toMatch(regex);
	expect(`"foo'`).not.toMatch(regex);

	// These 2 are actually valid in JS, but don't work with this regex.
	// But you shouldn't be using these in your requires anyway.
	expect(`"fo\\"o"`).not.toMatch(regex);
	expect(`'fo\\'o'`).not.toMatch(regex);

	expect(`"foo" + "bar"`).not.toMatch(regex);
});

// getRequires

it('should find calls to require in code', () => {
	expect(getRequires(`require('foo')`)).toEqual({
		foo: 'foo',
	});
	expect(getRequires(`require('./foo')`)).toEqual({
		'./foo': './foo',
	});
	expect(getRequires(`require('foo');require('bar')`)).toEqual({
		foo: 'foo',
		bar: 'bar',
	});
	expect(() => getRequires(`require('foo' + 'bar')`)).toThrowError(Error);
});
