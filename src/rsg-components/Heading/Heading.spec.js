import React from 'react';
import { html } from 'cheerio';
import Heading from './index';

describe('Heading', () => {
	it('should render a heading according to the level', () => {
		let actual = shallow(<Heading level={3}>The heading</Heading>);
		expect(actual.dive().name()).toBe('h3');

		actual = shallow(<Heading level={5}>The heading</Heading>);
		expect(actual.dive().name()).toBe('h5');
	});

	it('should render a heading', () => {
		const actual = render(<Heading level={2}>The heading</Heading>);

		expect(html(actual)).toMatchSnapshot();
	});
});
