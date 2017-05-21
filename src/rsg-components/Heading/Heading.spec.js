import React from 'react';
import { HeadingRenderer, styles } from './HeadingRenderer';

const props = {
	classes: classes(styles),
	id: 'heading',
	slotName: 'pizza',
	slotProps: {},
};

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

it('renderer should pass props to slots', () => {
	const actual = shallow(
		<HeadingRenderer {...props} slotName="slot" slotProps={{ foo: 1, bar: 'baz' }}>
			Heading
		</HeadingRenderer>
	);

	expect(actual).toMatchSnapshot();
});
