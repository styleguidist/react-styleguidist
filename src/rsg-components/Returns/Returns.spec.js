import React from 'react';
import { ReturnsRenderer, styles } from './ReturnsRenderer';

const props = {
	classes: classes(styles),
};

const returnDocumentation = [
	{
		title: 'Foo',
		description: 'Converts foo to bar',
		type: { name: 'String' },
	},
	{
		title: 'Bar',
		description: 'Converts bar to foo',
		type: null,
	},
	{
		title: 'Baz',
		type: { name: 'SyntheticEvent' },
	},
];

it('renderer should render type and description', () => {
	const actual = shallow(
		<ReturnsRenderer {...props} returnDocumentation={returnDocumentation[0]} />
	);

	expect(actual).toMatchSnapshot();
});

it('renderer should render only description', () => {
	const actual = shallow(
		<ReturnsRenderer {...props} returnDocumentation={returnDocumentation[1]} />
	);

	expect(actual).toMatchSnapshot();
});

it('renderer should render only type', () => {
	const actual = shallow(
		<ReturnsRenderer {...props} returnDocumentation={returnDocumentation[2]} />
	);

	expect(actual).toMatchSnapshot();
});

it('renderer should render heading', () => {
	const actual = shallow(
		<ReturnsRenderer {...props} returnDocumentation={returnDocumentation[0]} heading />
	);

	expect(actual).toMatchSnapshot();
});
