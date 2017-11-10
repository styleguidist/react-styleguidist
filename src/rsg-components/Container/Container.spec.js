import React from 'react';
import Container from './Container';

/* eslint-disable react/prop-types */

const children = <span>coffee</span>;
const options = {
	context: {
		slots: {
			slot: [
				{
					id: 'one',
					render: ({ children, ...rest }) => (
						<div {...rest} name="one">
							{children}
						</div>
					),
				},
				{
					id: 'two',
					render: ({ children, ...rest }) => (
						<div {...rest} name="two">
							{children}
						</div>
					),
				},
			],
			slot2: [],
		},
	},
};

it('should renderer slots and pass props and children', () => {
	const actual = render(
		<Container name="slot" props={{ title: 'Pizza' }}>
			{children}
		</Container>,
		options
	);

	expect(actual).toMatchSnapshot();
});

it('should return children if there are no slots', () => {
	const actual = render(<Container name="slot2">{children}</Container>, options);

	expect(actual).toMatchSnapshot();
});
