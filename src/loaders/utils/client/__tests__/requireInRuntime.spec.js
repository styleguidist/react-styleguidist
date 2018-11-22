import requireInRuntime from '../requireInRuntime';

const map = {
	a: () => 'a',
	b: () => 'b',
	c: {
		default: () => 'c.default',
	},
	d: {
		named: () => 'd.named',
	},
	e: {
		default: () => 'e.default',
		named: () => 'e.named',
	},
};

test('return a module from the map', () => {
	const result = requireInRuntime(map, 'a');
	expect(result).toBeDefined();
	expect(result()).toBe('a');
});

test('return a default export', () => {
	const result = requireInRuntime(map, 'c');
	expect(result).toBeDefined();
	expect(result()).toBe('c.default');
});

test('return a named export', () => {
	const result = requireInRuntime(map, 'd');
	expect(result).toBeDefined();
	expect(result.named).toBeDefined();
	expect(result.named()).toBe('d.named');
});

test('return both a default and a named exports', () => {
	const result = requireInRuntime(map, 'e');
	expect(result).toBeDefined();
	expect(result.named).toBeDefined();
	expect(result()).toBe('e.default');
	expect(result.named()).toBe('e.named');
});

test('throw if module is not in the map', () => {
	const fn = () => requireInRuntime(map, 'pizza');
	expect(fn).toThrowError('require() statements can be added');
});
