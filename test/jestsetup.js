/* eslint-disable no-console */

// Make Enzyme functions available in all test files without importing
import { shallow, render, mount } from 'enzyme';
global.shallow = shallow;
global.render = render;
global.mount = mount;

// Pretty print shallow rendering output for debugging
import prettyFormat from 'pretty-format';
import reactTestPlugin from 'pretty-format/plugins/ReactTestComponent';
global.html = function(wrapper) {
	console.log(prettyFormat(wrapper, {
		plugins: [reactTestPlugin],
	}));
};

// Skip createElement warnings but fail tests on any other warning
console.error = message => {
	if (!/(React.createElement: type should not be null)/.test(message)) {
		throw new Error(message);
	}
};

// document.createRange “polyfill” for CodeMirror
import noop from 'lodash/noop';
document.createRange = function() {
	return {
		setEnd: noop,
		setStart: noop,
		getBoundingClientRect() {
			return {
				right: 0,
			};
		},
		getClientRects() {
			return {
				right: 0,
			};
		},
	};
};
