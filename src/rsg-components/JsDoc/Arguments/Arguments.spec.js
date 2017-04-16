import React from 'react';
import { ArgumentsRenderer } from './ArgumentsRenderer';

describe('Arguments', () => {
	it('renderer should render Arguments', () => {
		const testTags = {
			param: [{
				title: 'param',
				name: 'test',
				description: 'Test description',
				type: 'Test type',
			}],
		};

		const actual = render(
			<ArgumentsRenderer classes={{}} tags={testTags} />
		);

		expect(actual).toMatchSnapshot();
	});
});

