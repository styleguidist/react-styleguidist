import test from 'ava';
import chunkify from '../loaders/utils/chunkify';

/* eslint-disable max-len */

test('should separate Markdown and component examples', t => {
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
			content: '# Header\n\nText with _some_ **formatting** and a [link](/foo).\n\n<div>And some HTML.</div>\n\n![Image](/bar.png)\n\n',
		},
		{
			type: 'code',
			content: '<h1>Hello Markdown!</h1>',
		},
		{
			type: 'markdown',
			content: '\n\nText with some `code`.\n\n',
		},
		{
			type: 'code',
			content: '<h2>Hello Markdown!</h2>',
		},
		{
			type: 'markdown',
			content: '\n\nThis is the same as above:\n\n',
		},
		{
			type: 'code',
			content: '<h3>Hello Markdown!</h3>',
		},
		{
			type: 'markdown',
			content: '\n\nThis should be highlighted:\n\n```html\n<span class="hljs-tag">&lt;<span class="hljs-name">h4</span>&gt;</span>Hello Markdown!<span class="hljs-tag">&lt;/<span class="hljs-name">h4</span>&gt;</span>\n```\n',
		},
	];

	const actual = chunkify(markdown);
	t.deepEqual(actual, expected);
});
