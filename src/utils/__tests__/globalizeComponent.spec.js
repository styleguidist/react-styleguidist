import globalizeComponent from '../globalizeComponent';

const component = { module: 'someModule', name: 'SomeName' };

describe('globalizeComponent', () => {
	afterEach(() => {
		delete global[component.name];
	});

	it('should not add anything as a global variable if there is no component name', () => {
		expect(global[component.name]).toBeUndefined();
		globalizeComponent({});
		expect(global[component.name]).toBeUndefined();
	});

	it('should set the return value of getComponent as a global variable', () => {
		expect(global[component.name]).toBeUndefined();
		globalizeComponent(component);
		expect(global[component.name]).toBe(component.module);
	});
});
