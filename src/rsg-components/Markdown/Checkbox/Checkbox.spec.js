import React from 'react';

import Checkbox from './index';

describe('Markdown Checkbox', () => {
	it('should render an input', () => {
		const actual = render(<Checkbox />);

		expect(actual).toMatchSnapshot();
	});
});
