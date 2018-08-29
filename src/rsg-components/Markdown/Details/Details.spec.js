import React from 'react';

import Details from './index';

describe('Markdown Details', () => {
	it('should render a Details', () => {
		const actual = render(<Details>This is a hidden text.</Details>);

		expect(actual).toMatchSnapshot();
	});
});
