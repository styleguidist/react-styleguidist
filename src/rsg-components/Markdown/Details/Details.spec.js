import React from 'react';

import Details from './index';

describe('Markdown Details', () => {
	it('should render a Details', () => {
		const actual = render(
			<Details tag="This is a summary element">This is Details-formatted text.</Details>
		);

		expect(actual).toMatchSnapshot();
	});
});
