/* eslint-disable no-console */

import { shallow, render, mount } from 'enzyme';
import keymirror from 'keymirror';
import * as theme from '../src/styles/theme';

// Make Enzyme functions available in all test files without importing
global.shallow = shallow;
global.render = render;
global.mount = mount;

// Get class names from styles function
global.classes = styles => keymirror(styles(theme));

// Skip createElement warnings but fail tests on any other warning
console.error = message => {
	if (
		!/(Warning: Accessing PropTypes via the main React package|React.createClass is deprecated)/.test(
			message
		)
	) {
		throw new Error(message);
	}
};

// document.createRange “polyfill” for CodeMirror
document.createRange = function() {
	return {
		setEnd: () => {},
		setStart: () => {},
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

// requestAnimationFrame “polyfill”
window.requestAnimationFrame = a => a();

jest.mock('react-scripts/config/webpack.config.dev', () => ({ cra: true }), { virtual: true });
jest.mock('webpack-dev-server', function() {
	return function() {
		return {
			app: {},
		};
	};
});
