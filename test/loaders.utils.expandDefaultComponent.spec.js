import test from 'ava';
import expandDefaultComponent from '../loaders/utils/expandDefaultComponent';

test('expandDefaultComponent() replace placeholders with component name', t => {
	const exampleMarkdown = `
<div>
	<__COMPONENT__>
		<span>text</span>
		<span>Name of component: __COMPONENT__</span>
	</__COMPONENT__>
	<__COMPONENT__ />
</div>
`;
	const result = expandDefaultComponent(exampleMarkdown, 'FooComponent');
	t.notRegex(result, /__COMPONENT__/);
	t.regex(result, /FooComponent/);
	t.is(result.match(/FooComponent/g).length, 4);
});
