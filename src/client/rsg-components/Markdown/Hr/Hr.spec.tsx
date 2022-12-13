import React from 'react';
import renderer from 'react-test-renderer';

import Hr from './index';

describe('Markdown Hr', () => {
	it('should render a horizontal rule', () => {
		const actual = renderer.create(<Hr />);

		expect(actual.toJSON()).toMatchSnapshot();
	});
});
