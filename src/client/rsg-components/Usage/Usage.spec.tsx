import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import { PropTypeDescriptor, MethodDescriptor } from 'react-docgen';
import Usage from './Usage';

const props = [
	{
		name: 'children',
		type: { name: 'string' } as PropTypeDescriptor,
		required: true,
		description: 'Button label.',
	},
];
const methods: MethodDescriptor[] = [
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
		const renderer = createRenderer();
		renderer.render(<Usage props={{ props }} />);

		expect(renderer.getRenderOutput()).toMatchSnapshot();
	});

	it('should render methods table', () => {
		const renderer = createRenderer();
		renderer.render(<Usage props={{ methods }} />);

		expect(renderer.getRenderOutput()).toMatchSnapshot();
	});

	it('should render nothing without props and methods', () => {
		const renderer = createRenderer();
		renderer.render(<Usage props={{}} />);

		expect(renderer.getRenderOutput()).toBe(null);
	});
});
