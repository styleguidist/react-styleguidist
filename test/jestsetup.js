/* eslint-disable no-console */

import { configure, shallow, render, mount } from 'enzyme';
import keymirror from 'keymirror';
import Adapter from 'enzyme-adapter-react-16';
import * as theme from '../packages/react-styleguidist/src/client/styles/theme';

configure({ adapter: new Adapter() });

// Make Enzyme functions available in all test files without importing
global.shallow = shallow;
global.render = render;
global.mount = mount;

// Setup alias for test folder to avoid resolving it multiple times
global.TEST_FOLDER_PATH = __dirname;

// Get class names from styles function
global.classes = styles => keymirror(styles(theme));

jest.mock('react-scripts/config/webpack.config.dev', () => ({ cra: true }), { virtual: true });
jest.mock('webpack-dev-server', function() {
	return function() {
		return {
			app: {},
		};
	};
});
