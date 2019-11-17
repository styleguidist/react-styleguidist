import React from 'react';

import List from './index';

describe('Markdown List', () => {
	it('should render an unordered list', () => {
		const actual = render(
			<List>
				<li>First</li>
				<li>Second</li>
			</List>
		);

		expect(actual).toMatchSnapshot();
	});

	it('should render an ordered list', () => {
		const actual = render(
			<List ordered>
				<li>First</li>
				<li>Second</li>
			</List>
		);

		expect(actual).toMatchSnapshot();
	});
});
