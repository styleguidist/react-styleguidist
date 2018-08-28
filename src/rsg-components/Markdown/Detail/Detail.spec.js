import React from 'react';

import Detail from './index';

describe('Markdown Detail', () => {
	it('should render a Detail', () => {
		const actual = render(<Detail />);

		expect(actual).toMatchSnapshot();
	});
});
