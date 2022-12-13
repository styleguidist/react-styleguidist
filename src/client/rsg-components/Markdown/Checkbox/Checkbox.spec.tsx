import React from 'react';
import renderer from 'react-test-renderer';

import Checkbox from './index';

describe('Markdown Checkbox', () => {
	it('should render a checkbox input', () => {
		const actual = renderer.create(<Checkbox />);

		expect(actual.toJSON()).toMatchSnapshot();
	});
});
