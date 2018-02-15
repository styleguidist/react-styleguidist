import globalizeComponent from '../globalizeComponent';

jest.mock('../getComponent');
// eslint-disable-next-line import/first
import getComponent, { returnValue } from '../getComponent';

const component = { module: 'someModule', name: 'SomeName' };

afterEach(() => {
	delete global[component.name];
});

describe('globalizeComponent', () => {
	it('should call the getComponent function with the correct arguments', () => {
		globalizeComponent(component);
		expect(getComponent).toHaveBeenCalledWith(component.module, component.name);
	});

	it('should set the return value of getComponent as a global variable', () => {
		const globalsCount = Object.keys(global).length;
		globalizeComponent(component);
		expect(Object.keys(global).length).toBe(globalsCount + 1);
		expect(global[component.name]).toBe(returnValue);
	});
});
