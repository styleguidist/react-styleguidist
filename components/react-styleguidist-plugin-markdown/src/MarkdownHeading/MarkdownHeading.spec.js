import React from 'react';
import { html } from 'cheerio';
import MarkdownHeading from './index';

describe('Markdown Heading', () => {
	it('should render a heading with a wrapper that provides margin', () => {
		const actual = render(<MarkdownHeading level={2}>The markdown heading</MarkdownHeading>);

		expect(html(actual)).toMatchSnapshot();
	});
});
