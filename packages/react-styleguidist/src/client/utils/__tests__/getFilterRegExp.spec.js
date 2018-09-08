import getFilterRegExp from '../getFilterRegExp';

describe('getFilterRegExp', () => {
	it('should return a RegExp', () => {
		const result = getFilterRegExp('');
		expect(result instanceof RegExp).toBe(true);
	});

	it('RegExp should fuzzy match a string', () => {
		const result = getFilterRegExp('btn');
		expect('button').toMatch(result);
	});

	it('RegExp should not match when string is different', () => {
		const result = getFilterRegExp('buttons');
		expect('button').not.toMatch(result);
	});

	it('should not throw when query contains special characters', () => {
		const fn = () => getFilterRegExp('\\');
		expect(fn).not.toThrow();
	});

	it('RegExp should ignore non-alphanumeric characters', () => {
		const result = getFilterRegExp('#$b()tn');
		expect('button').toMatch(result);
	});
});
