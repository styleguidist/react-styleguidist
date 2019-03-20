import React from 'react';

import Checkbox from './index';

describe('Markdown Checkbox', () => {
	it('should render a checkbox input', () => {
		const actual = render(<Checkbox />);

		expect(actual).toMatchSnapshot();
	});
});
