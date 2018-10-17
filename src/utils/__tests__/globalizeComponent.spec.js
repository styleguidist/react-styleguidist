import globalizeComponent from '../globalizeComponent';

const component = { module: 'someModule', name: 'SomeName' };

describe('globalizeComponent', () => {
	beforeEach(() => {
		global.RsgUserComponents = {};
	});

	afterEach(() => {
		delete global.RsgUserComponents;
	});

	it('should not add anything as a global variable if there is no component name', () => {
		expect(global.RsgUserComponents[component.name]).toBeUndefined();
		globalizeComponent({});
		expect(global.RsgUserComponents[component.name]).toBeUndefined();
	});

	it('should set the return value of getComponent as a global variable', () => {
		expect(global.RsgUserComponents[component.name]).toBeUndefined();
		globalizeComponent(component);
		expect(global.RsgUserComponents[component.name]).toBe(component.module);
	});
});
