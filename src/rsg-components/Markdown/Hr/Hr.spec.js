import React from 'react';

import Hr from './index';

describe('Markdown Hr', () => {
	it('should render a horizontal rule', () => {
		const actual = render(<Hr />);

		expect(actual).toMatchSnapshot();
	});
});
