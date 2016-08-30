import test from 'ava';
import examplesLoader from '../loaders/examples.loader';

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
