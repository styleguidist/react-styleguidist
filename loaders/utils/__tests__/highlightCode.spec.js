import highlightCode from '../highlightCode';

it('should highlight code', () => {
	const code = `
<p>Hello React</p>
`;
	const actual = highlightCode(code);
	expect(actual).toMatchSnapshot();
});

it('should highlight code with specified language', () => {
	const code = `
<p>Hello React</p>
`;
	const actual = highlightCode(code, 'html');
	expect(actual).toMatchSnapshot();
});

it('should return an error message', () => {
	const actual = highlightCode('', 'pizza');
	expect(actual).toBe('Unknown language: "pizza"');
});
