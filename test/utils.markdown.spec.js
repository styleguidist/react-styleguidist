import test from 'ava';
import createRenderer from '../src/utils/markdown';

test('should render only block level code in Markdown', t => {
	const markdown = `
# Header

Text with *some* **formatting** and a [link](/foo).

![Image](/bar.png)

	<div/>

Text with some \`code\`.

\`\`\`
<span/>
\`\`\`
`;
	const expected = `
# Header

Text with *some* **formatting** and a [link](/foo).

![Image](/bar.png)
<pre><code>&lt;div/&gt;
</code></pre>

Text with some \`code\`.
<pre><code>&lt;span/&gt;
</code></pre>
`;
	const actual = createRenderer().render(markdown);
	t.is(actual, expected);
});
