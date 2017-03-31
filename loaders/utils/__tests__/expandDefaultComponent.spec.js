import expandDefaultComponent from '../expandDefaultComponent';

it('expandDefaultComponent() replace placeholders with component name', () => {
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
	expect(result).not.toMatch(/__COMPONENT__/);
	expect(result).toMatch(/FooComponent/);
	expect(result.match(/FooComponent/g).length).toBe(4);
});
