import React from 'react';
import Heading, { HeadingRenderer } from './HeadingRenderer';

describe('Heading', () => {
	it('renderer should render H tag', () => {
		const actual = render(
			<HeadingRenderer classes={{}} level={1} slug="heading">Heading</HeadingRenderer>
		);

		expect(actual).toMatchSnapshot();
	});

	it('should render h{n} tag with anchor link inside', () => {
		[1, 2, 3, 4, 5, 6].forEach(level => {
			expect(render(
				<Heading level={level} slug={`h${level}`}>{`H${level}`}</Heading>
			)).toMatchSnapshot();
		});
	});

	it('should compose passed class names', () => {
		const actual = render(
			<Heading level={1} className="customClassName" slug="test">
				Test heading
			</Heading>
		);

		expect(actual.find('h1').hasClass('customClassName')).toEqual(true);
	});
});

