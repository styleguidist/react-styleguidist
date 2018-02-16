import globalizeComponent from '../globalizeComponent';

jest.mock('../getComponent');
// eslint-disable-next-line import/first
import getComponent, { returnValue } from '../getComponent';

const component = { module: 'someModule', name: 'SomeName' };

afterEach(() => {
	delete global[component.name];
});

describe('globalizeComponent', () => {
	it('should not add anything as a global variable if there is no component name', () => {
		expect(global[component.name]).toBeUndefined();
		globalizeComponent({});
		expect(global[component.name]).toBeUndefined();
	});

	it('should call the getComponent function with the correct arguments', () => {
		globalizeComponent(component);
		expect(getComponent).toHaveBeenCalledWith(component.module, component.name);
	});

	it('should set the return value of getComponent as a global variable', () => {
		expect(global[component.name]).toBeUndefined();
		globalizeComponent(component);
		expect(global[component.name]).toBe(returnValue);
	});
});
