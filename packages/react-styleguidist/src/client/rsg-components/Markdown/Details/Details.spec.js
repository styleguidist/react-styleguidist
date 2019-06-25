import React from 'react';

import { Details, DetailsSummary } from './index';

describe('Markdown Details', () => {
	it('should render a Details', () => {
		const actual = render(
			<Details>
				<DetailsSummary>Solution</DetailsSummary>
				This is a hidden text.
			</Details>
		);

		expect(actual).toMatchSnapshot();
	});
});
