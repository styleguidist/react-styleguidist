import React from 'react';
import renderer from 'react-test-renderer';

import List from './index';

describe('Markdown List', () => {
	it('should render an unordered list', () => {
		const actual = renderer.create(
			<List>
				<li>First</li>
				<li>Second</li>
			</List>
		);

		expect(actual.toJSON()).toMatchSnapshot();
	});

	it('should render an ordered list', () => {
		const actual = renderer.create(
			<List ordered>
				<li>First</li>
				<li>Second</li>
			</List>
		);

		expect(actual.toJSON()).toMatchSnapshot();
	});
});
