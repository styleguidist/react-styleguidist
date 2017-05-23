import React from 'react';
import Heading, { HeadingRenderer, styles } from './HeadingRenderer';

const props = {
	classes: classes(styles),
	id: 'heading',
};

it('should pass props to slots', () => {
	const actual = shallow(
		<Heading id="heading" slotName="slot" slotProps={{ foo: 1, bar: 'baz' }}>
			Heading
		</Heading>
	);

	expect(actual).toMatchSnapshot();
});

it('renderer should render H2 tag', () => {
	const actual = shallow(<HeadingRenderer {...props}>Heading</HeadingRenderer>);

	expect(actual).toMatchSnapshot();
});

it('renderer should render H1 tag', () => {
	const actual = shallow(<HeadingRenderer {...props} primary>Heading</HeadingRenderer>);

	expect(actual).toMatchSnapshot();
});

it('renderer should render heading with deprecated styles', () => {
	const actual = shallow(<HeadingRenderer {...props} deprecated>Heading</HeadingRenderer>);

	expect(actual).toMatchSnapshot();
});
