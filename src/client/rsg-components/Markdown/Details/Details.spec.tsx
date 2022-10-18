import React from 'react';
import renderer from 'react-test-renderer';

import { Details, DetailsSummary } from './index';

describe('Markdown Details', () => {
	it('should render a Details', () => {
		const actual = renderer.create(
			<Details>
				<DetailsSummary>Solution</DetailsSummary>
				This is a hidden text.
			</Details>
		);

		expect(actual.toJSON()).toMatchSnapshot();
	});
});
