import test from 'ava';
import examplesLoader from '../loaders/examples.loader';

/* eslint-disable max-len, quotes */

const regex = new RegExp(examplesLoader.requireAnythingTest);

// requireAnythingRegex

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
	const replaced = `require('foo');require('bar')`.replace(examplesLoader.requireAnythingRegex, 'x');
	t.is(replaced, 'x;x');
});

// simpleStringRegex

test('should match simple strings and nothing else', t => {
	const regex = examplesLoader.simpleStringRegex;

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

// findRequires

test('should find calls to require in code', t => {
	const findRequires = examplesLoader.findRequires;
	t.deepEqual(findRequires(`require('foo')`), ['foo']);
	t.deepEqual(findRequires(`require('./foo')`), ['./foo']);
	t.deepEqual(findRequires(`require('foo');require('bar')`), ['foo', 'bar']);
	t.throws(() => findRequires(`require('foo' + 'bar')`), Error);
});

// loader

test('should return valid, parsable JS', t => {
	let exampleMarkdown = `
# header

	<div/>

text

\`\`\`
<span/>
\`\`\`
`;
	let output = examplesLoader.call({}, exampleMarkdown);
	t.notThrows(() => new Function(output), SyntaxError);  // eslint-disable-line no-new-func
});

// componentName query option

test('should replace all occurrences of __COMPONENT__ with provided query.componentName', t => {
	const exampleMarkdown = `
<div>
	<__COMPONENT__>
		<span>text</span>
		<span>Name of component: __COMPONENT__</span>
	</__COMPONENT__>
	<__COMPONENT__ />
</div>
`;

	const output = examplesLoader.call({ query: '?componentName=FooComponent' }, exampleMarkdown);
	t.notRegex(output, /__COMPONENT__/);
	t.regex(output, /FooComponent/);
	t.is(output.match(/FooComponent/g).length, 4);
});
