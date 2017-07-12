import chunkify from '../chunkify';

/* eslint-disable max-len */

it('should separate Markdown and component examples', () => {
	const markdown = `
# Header

Text with *some* **formatting** and a [link](/foo).

<div>And some HTML.</div>

![Image](/bar.png)

This code example should be rendered as a playground:

	<h1>Hello Markdown!</h1>

Text with some \`code\` (playground too).

\`\`\`
<h2>Hello Markdown!</h2>
\`\`\`

And some language and modifier (playground again):

\`\`\`jsx noeditor
<h3>Hello Markdown!</h3>
\`\`\`

This should be just highlighted:

\`\`\`jsx static
<h4>Hello Markdown!</h4>
\`\`\`

This should be highlighted too:

\`\`\`html
<h5>Hello Markdown!</h5>
\`\`\`
`;

	const actual = chunkify(markdown);
	expect(actual).toMatchSnapshot();
});

it('should not add empty Markdown chunks', () => {
	const markdown = `
Foo:

	<h1>Hello Markdown!</h1>
`;
	const expected = [
		{
			type: 'markdown',
			content: 'Foo:',
		},
		{
			type: 'code',
			content: '<h1>Hello Markdown!</h1>',
			settings: {},
		},
	];

	const actual = chunkify(markdown);
	expect(actual).toEqual(expected);
});

it('should parse examples settings correctly', () => {
	const markdown = `
Pass props to CodeRenderer

\`\`\`js { "showCode": true }
<h1>Hello Markdown!</h1>
\`\`\`

\`\`\`js { "frame": {"width": "400px"} }
<h1>Example in frame and Without editor</h1>
\`\`\`
	
Pass props to PreviewRenderer

\`\`\`jsx { "noEditor": true }
<h2>Hello Markdown!</h2>
\`\`\`

\`\`\`jsx static
<h2>This is Highlighted!</h2>
\`\`\`
`;
	const actual = chunkify(markdown);
	expect(actual).toMatchSnapshot();
});

it('should call updateExample function for example', () => {
	const markdown = `
\`\`\`jsx {"file": "./src/button/example.jsx"}
\`\`\`
`;
	const expected = [
		{
			type: 'code',
			content: '<h1>Hello Markdown!</h1>',
			settings: {},
		},
	];
	const updateExample = props => {
		const content = props.content;
		const lang = props.lang;
		const settings = props.settings;
		if (typeof settings.file === 'string') {
			delete settings.file;
			return {
				content: '<h1>Hello Markdown!</h1>',
				settings,
				lang,
			};
		}

		return {
			content,
			settings,
			lang,
		};
	};
	const actual = chunkify(markdown, updateExample);
	expect(actual).toEqual(expected);
});
