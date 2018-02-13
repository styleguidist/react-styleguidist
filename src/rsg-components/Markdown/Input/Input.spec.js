import React from 'react';

import Input from './index';

describe('Markdown Input', () => {
	it('should render an input with the specified type', () => {
		const actual = render(<Input type="checkbox" />);

		expect(actual).toMatchSnapshot();
	});
});
