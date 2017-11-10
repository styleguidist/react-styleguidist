import examplesLoader from '../examples-loader';

it('should return valid, parsable JS', () => {
	const exampleMarkdown = `
# header

	const _ = require('lodash');
	<div/>

text

\`\`\`
<span/>
\`\`\`
`;
	const result = examplesLoader.call(
		{
			_styleguidist: {
				context: {
					_: 'lodash',
				},
			},
		},
		exampleMarkdown
	);

	expect(result).toBeTruthy();
	expect(() => new Function(result)).not.toThrowError(SyntaxError); // eslint-disable-line no-new-func
});

// componentName query option

it('should replace all occurrences of __COMPONENT__ with provided query.componentName', () => {
	const exampleMarkdown = `
<div>
	<__COMPONENT__>
		<span>text</span>
		<span>Name of component: __COMPONENT__</span>
	</__COMPONENT__>
	<__COMPONENT__ />
</div>
`;

	const result = examplesLoader.call(
		{
			query: '?componentName=FooComponent',
			_styleguidist: {},
		},
		exampleMarkdown
	);
	expect(result).not.toMatch(/__COMPONENT__/);
	expect(result).toMatch(/FooComponent/);
	expect(result.match(/FooComponent/g).length).toBe(4);
});

it('should pass updateExample function from config to chunkify', () => {
	const exampleMarkdown = `
\`\`\`jsx static
<h1>Hello world!</h2>
\`\`\`
`;
	const updateExample = jest.fn(props => props);
	examplesLoader.call(
		{
			query: '?componentName=FooComponent',
			resourcePath: '/path/to/foo/examples/file',
			_styleguidist: {
				updateExample,
			},
		},
		exampleMarkdown
	);
	expect(updateExample).toBeCalledWith(
		{
			content: '<h1>Hello world!</h2>',
			settings: { static: true },
			lang: 'jsx',
		},
		'/path/to/foo/examples/file'
	);
});
