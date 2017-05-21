import React from 'react';
import Slot from './Slot';

/* eslint-disable react/prop-types */

const Div = ({ name }) => <div>{name} 1</div>;
const Div2 = ({ name }) => <div>{name} 2</div>;

it('should renderer slots and pass props', () => {
	const actual = shallow(<Slot name="slot" props={{ name: 'Pizza' }} />, {
		context: {
			slots: {
				slot: [Div, Div2],
			},
		},
	});

	expect(actual).toMatchSnapshot();
});

it('should not render empty slots', () => {
	const actual = shallow(<Slot name="slot" props={{ name: 'Pizza' }} />, {
		context: {
			slots: {
				slot: [null, Div2],
			},
		},
	});

	expect(actual).toMatchSnapshot();
});

it('should return null if all slots render null', () => {
	const actual = render(<Slot name="slot" props={{ name: 'Pizza' }} />, {
		context: {
			slots: {
				slot: [() => null],
			},
		},
	});

	expect(actual.node).toBeFalsy();
});
