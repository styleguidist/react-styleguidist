import React from 'react';
import SectionHeading, { SectionHeadingRenderer, styles } from './SectionHeadingRenderer';

const props = {
	classes: classes(styles),
	id: 'heading',
	href: '/heading',
	depth: 3,
};

it('should pass props to slots', () => {
	const actual = shallow(
		<SectionHeading
			id="heading"
			depth={1}
			href="/heading"
			slotName="slot"
			slotProps={{ foo: 1, bar: 'baz' }}
		>
			Heading
		</SectionHeading>
	);

	expect(actual).toMatchSnapshot();
});

it('renderer should render H4 tag', () => {
	const actual = shallow(<SectionHeadingRenderer {...props}>Heading</SectionHeadingRenderer>);

	expect(actual).toMatchSnapshot();
});

it('renderer should render heading with deprecated styles', () => {
	const actual = shallow(
		<SectionHeadingRenderer {...props} deprecated>
			Heading
		</SectionHeadingRenderer>
	);

	expect(actual).toMatchSnapshot();
});
