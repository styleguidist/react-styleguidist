import React from 'react';
import Usage from './Usage';

const props = [
	{
		name: 'children',
		type: { name: 'string' },
		required: true,
		description: 'Button label.',
	},
];
const methods = [
	{
		name: 'set',
		params: [
			{
				name: 'newValue',
				description: 'New value for the counter.',
				type: { name: 'Number' },
			},
		],
		returns: null,
		description: 'Sets the counter to a particular value.',
	},
];

describe('Usage', () => {
	it('should render props table', () => {
		const actual = shallow(<Usage props={{ props }} />);

		expect(actual).toMatchSnapshot();
	});

	it('should render methods table', () => {
		const actual = shallow(<Usage props={{ methods }} />);

		expect(actual).toMatchSnapshot();
	});

	it('should render nothing without props and methods', () => {
		const actual = shallow(<Usage props={{}} />);

		expect(actual.getElement()).toBe(null);
	});
});
