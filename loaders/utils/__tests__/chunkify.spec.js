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

\`\`\`
<h2>Hello Markdown!</h2>
\`\`\`

This is the same as above:

\`\`\`example
<h3>Hello Markdown!</h3>
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
		},
		{
			type: 'markdown',
			content: 'Text with some `code`.',
		},
		{
			type: 'code',
			content: '<h2>Hello Markdown!</h2>',
		},
		{
			type: 'markdown',
			content: 'This is the same as above:',
		},
		{
			type: 'code',
			content: '<h3>Hello Markdown!</h3>',
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
		},
	];

	const actual = chunkify(markdown);
	expect(actual).toEqual(expected);
});
