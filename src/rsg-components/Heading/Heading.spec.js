import React from 'react';
import Heading, { HeadingRenderer } from './HeadingRenderer';

describe('Heading', () => {
	it('renderer should render H tag', () => {
		const actual = render(
			<HeadingRenderer classes={{}} hierarchy={1} slug="heading">Heading</HeadingRenderer>
		);

		expect(actual).toMatchSnapshot();
	});

	it('should render h{n} tag with anchor link inside', () => {
		[1, 2, 3, 4, 5, 6].forEach(hierarchy => {
			expect(render(
				<Heading hierarchy={hierarchy} slug={`h${hierarchy}`}>{`H${hierarchy}`}</Heading>
			)).toMatchSnapshot();
		});
	});

	it('should compose passed class names', () => {
		const actual = render(
			<Heading hierarchy={1} className="customClassName" slug="test">
				Test heading
			</Heading>
		);

		expect(actual.find('h1').hasClass('customClassName')).toEqual(true);
	});
});

