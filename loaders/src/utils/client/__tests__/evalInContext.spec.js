import evalInContext from '../evalInContext';

it('should return a function', () => {
	const result = evalInContext('alert("header");', a => a, 'alert("code");');
	expect(typeof result).toBe('function');
});
