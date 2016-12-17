import test from 'ava';
import examplesLoader from '../loaders/examples.loader';

test('should return valid, parsable JS', t => {
	const exampleMarkdown = `
# header

	const _ = require('lodash');
	<div/>

text

\`\`\`
<span/>
\`\`\`
`;
	const result = examplesLoader.call({}, exampleMarkdown);
	t.truthy(result);
	t.notThrows(() => new Function(result), SyntaxError);  // eslint-disable-line no-new-func
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

	const result = examplesLoader.call({ query: '?componentName=FooComponent' }, exampleMarkdown);
	t.notRegex(result, /__COMPONENT__/);
	t.regex(result, /FooComponent/);
	t.is(result.match(/FooComponent/g).length, 4);
});
