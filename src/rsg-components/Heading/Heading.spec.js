import React from 'react';
import { HeadingRenderer } from './HeadingRenderer';

it('renderer should render H tag', () => {
	const actual = shallow(
		<HeadingRenderer classes={{}} level={1} slug="heading">Heading</HeadingRenderer>
	);

	expect(actual).toMatchSnapshot();
});

it('should compose passed class names', () => {
	const actual = shallow(
		<HeadingRenderer
			classes={{ heading: 'baseHeadingClass' }}
			className="customClass"
			level={1}
			slug="test"
		>
			Test heading
		</HeadingRenderer>
	);

	expect(actual.find('h1').prop('className')).toBe('baseHeadingClass customClass');
});

[1, 2, 3, 4, 5, 6].forEach(level => {
	it(`should render h${level} tag with anchor link inside`, () => {
		const actual = shallow(
			<HeadingRenderer classes={{}} level={level} slug={`h${level}`}>{`H${level}`}</HeadingRenderer>
		);
		expect(actual).toMatchSnapshot();
	});
});
