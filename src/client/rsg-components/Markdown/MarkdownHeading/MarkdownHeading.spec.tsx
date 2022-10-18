import React from 'react';
import renderer from 'react-test-renderer';
import MarkdownHeading from './index';

describe('Markdown Heading', () => {
	it('should render a heading with a wrapper that provides margin and an id', () => {
		const actual = renderer.create(
			<MarkdownHeading id="the-markdown-heading" level={2}>
				The markdown heading
			</MarkdownHeading>
		);

		expect(actual).toMatchSnapshot();
	});
});
