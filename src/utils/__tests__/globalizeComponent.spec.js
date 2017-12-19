import globalizeComponent from '../globalizeComponent';

afterEach(() => {
	delete global.Foo;
});

describe('globalizeComponent', () => {
	it('should set component’s module as a global variable', () => {
		const globalsCount = Object.keys(global).length;
		globalizeComponent({
			name: 'Foo',
			props: {},
			module: 13,
		});
		expect(Object.keys(global).length).toBe(globalsCount + 1);
		expect(global.Foo).toBe(13);
	});
});
