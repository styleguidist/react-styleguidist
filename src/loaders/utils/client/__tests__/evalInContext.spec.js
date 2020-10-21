import evalInContext from '../evalInContext';

describe('evalInContext', () => {
	test('return a function', () => {
		const result = evalInContext(`alert('header')`, (a) => a, `alert('code')`);
		expect(typeof result).toBe('function');
	});

	test('create a separate scope for the body', () => {
		const fn = () =>
			evalInContext(
				`const react = require('react')`,
				(a) => a,
				`const react = require('react')
const x = 42
`
			);
		expect(fn).not.toThrow();
	});
});
