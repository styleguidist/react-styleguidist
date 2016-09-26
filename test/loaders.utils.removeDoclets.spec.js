import test from 'ava';
import removeDoclets from '../loaders/utils/removeDoclets';

/* eslint-disable quotes */

test('should find calls to require in code', t => {
	const text = `
Component is described here.

@example ./extra.examples.md
@foo bar
`;
	const expected = `
Component is described here.


`;
	const actual = removeDoclets(text);
	t.is(actual, expected);
});
