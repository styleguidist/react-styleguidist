import requireInRuntime from '../requireInRuntime';

const map = {
	a: () => 'a',
};

test('return a module from the map', () => {
	const result = requireInRuntime(map, 'a');
	expect(result).toBeDefined();
	expect(result()).toBe('a');
});

test('throw if module is not in the map', () => {
	const fn = () => requireInRuntime(map, 'pizza');
	expect(fn).toThrowError('require() statements can be added');
});
