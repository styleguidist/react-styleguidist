import React from 'react';

import Blockquote from './index';

describe('Markdown Blockquote', () => {
	it('should render a blockquote', () => {
		const actual = render(<Blockquote>To be, or not to be: that is the question</Blockquote>);

		expect(actual).toMatchSnapshot();
	});

	it('should preserve custom css class', () => {
		const actual = render(
			<Blockquote className="test-class">To be, or not to be: that is the question</Blockquote>
		);

		expect(actual).toMatchSnapshot();
	});
});
