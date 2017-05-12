import React from 'react';
import { ArgumentsRenderer } from './ArgumentsRenderer';

it('renderer should render arguments', () => {
	const args = [
		{
			name: 'Foo',
			description: 'Converts foo to bar',
			type: { name: 'Array' },
		},
		{
			name: 'Foo',
		},
	];
	const actual = shallow(<ArgumentsRenderer classes={{}} args={args} />);

	expect(actual).toMatchSnapshot();
});

it('renderer should render nothing for empty array', () => {
	const actual = shallow(<ArgumentsRenderer classes={{}} args={[]} />);

	expect(actual.node).toBe(null);
});
