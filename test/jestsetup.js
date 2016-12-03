// Make Enzyme functions available in all test files without importing
import { shallow, render } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
global.shallow = shallow;
global.render = render;
global.shallowToJson = shallowToJson;

// Skip createElement warnings but fail tests on any other warning
console.error = message => {  // eslint-disable-line no-console
	if (!/(React.createElement: type should not be null)/.test(message)) {
		throw new Error(message);
	}
};
