import React from 'react';
import Usage from './Usage';
import { UsageRenderer } from './UsageRenderer';

const props = {
	children: {
		type: { name: 'string' },
		required: true,
		description: 'Button label.',
	},
};
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
	it('should pass props and methods to renderer', () => {
		const actual = shallow(<Usage props={{ props, methods }} />);

		expect(actual).toMatchSnapshot();
	});
});

describe('UsageRenderer', () => {
	it('should render component renderer for component with props', () => {
		const actual = shallow(<UsageRenderer classes={{}} props={<div>props</div>} />);

		expect(actual).toMatchSnapshot();
	});

	it('should render component renderer for component with methods', () => {
		const actual = shallow(<UsageRenderer classes={{}} methods={<div>methods</div>} />);

		expect(actual).toMatchSnapshot();
	});

	it('should render nothing without props and methods', () => {
		const actual = shallow(<UsageRenderer classes={{}} />);

		expect(actual.node).toBe(null);
	});
});
