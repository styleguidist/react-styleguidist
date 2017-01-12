import highlightCode from '../highlightCode';

it('should highlight code', () => {
	const text = `
The only true button.

\`\`\`
<p>Hello React</p>
\`\`\`
`;
	const actual = highlightCode(text);
	expect(actual).toMatchSnapshot();
});

it('should highlight code with specified language', () => {
	const text = `
The only true button.

\`\`\`html
<p>Hello React</p>
\`\`\`
`;
	const actual = highlightCode(text);
	expect(actual).toMatchSnapshot();
});
