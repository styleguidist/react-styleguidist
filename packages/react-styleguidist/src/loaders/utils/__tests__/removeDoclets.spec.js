import removeDoclets from '../removeDoclets';

/* eslint-disable quotes */

it('should find calls to require in code', () => {
	const text = `
Component is described here.

@example ./extra.examples.md
@foo bar
`;
	const expected = `
Component is described here.


`;
	const actual = removeDoclets(text);
	expect(actual).toBe(expected);
});
