import chunkify from '../chunkify';

/* eslint-disable max-len */

it('should separate Markdown and component examples', () => {
	const markdown = `
# Header

Text with *some* **formatting** and a [link](/foo).

<div>And some HTML.</div>

![Image](/bar.png)

	<h1>Hello Markdown!</h1>

Text with some \`code\`.

\`\`\`jsx { "static": false }
<h2>Hello Markdown!</h2>
\`\`\`

This should be highlighted:

\`\`\`html
<h4>Hello Markdown!</h4>
\`\`\`
`;
	const expected = [
		{
			type: 'markdown',
			content:
				'# Header\n\nText with _some_ **formatting** and a [link](/foo).\n\n<div>And some HTML.</div>\n\n![Image](/bar.png)',
		},
		{
			type: 'code',
			content: '<h1>Hello Markdown!</h1>',
			settings: {},
		},
		{
			type: 'markdown',
			content: 'Text with some `code`.',
		},
		{
			type: 'code',
			content: '<h2>Hello Markdown!</h2>',
			settings: {
				static: false,
			},
		},
		{
			type: 'markdown',
			content:
				'This should be highlighted:\n\n```html\n<span class="hljs-tag">&lt;<span class="hljs-name">h4</span>&gt;</span>Hello Markdown!<span class="hljs-tag">&lt;/<span class="hljs-name">h4</span>&gt;</span>\n```',
		},
	];

	const actual = chunkify(markdown);
	expect(actual).toEqual(expected);
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
	const expected = [
		{
			type: 'markdown',
			content: 'Pass props to CodeRenderer',
		},
		{
			type: 'code',
			content: '<h1>Hello Markdown!</h1>',
			settings: {
				showcode: true,
			},
		},
		{
			type: 'code',
			content: '<h1>Example in frame and Without editor</h1>',
			settings: {
				frame: {
					width: '400px',
				},
			},
		},
		{
			type: 'markdown',
			content: 'Pass props to PreviewRenderer',
		},
		{
			type: 'code',
			content: '<h2>Hello Markdown!</h2>',
			settings: {
				noeditor: true,
			},
		},
		{
			type: 'markdown',
			content:
				'```jsx\n&lt;h2&gt;This is Highlighted!<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span></span>\n```',
		},
	];
	const actual = chunkify(markdown);
	expect(actual).toEqual(expected);
});

it('should call examplePreprocessor function for example', () => {
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
	const examplePreprocessor = props => {
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
	const actual = chunkify(markdown, examplePreprocessor);
	expect(actual).toEqual(expected);
});
