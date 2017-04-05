import requireInRuntime from '../requireInRuntime';

const map = {
	a: 42,
	b: 43,
};

it('should return a module from the map', () => {
	const result = requireInRuntime(map, 'a');
	expect(result).toBe(map.a);
});

it('should throw if module is not in the map', () => {
	const fn = () => requireInRuntime(map, 'c');
	expect(fn).toThrowError('require() statements can be added');
});
