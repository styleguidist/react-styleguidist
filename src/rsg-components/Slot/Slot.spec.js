import React from 'react';
import Slot from './Slot';

/* eslint-disable react/prop-types */

const Button = ({ onClick }) => <button onClick={onClick}>1</button>;
const Button2 = () => <button>2</button>;
const fillsWithIds = [
	{
		id: 'one',
		render: Button,
	},
	{
		id: 'two',
		render: Button2,
	},
];

it('should renderer slots and pass props', () => {
	const actual = shallow(<Slot name="slot" props={{ id: 'Pizza' }} />, {
		context: {
			slots: {
				slot: [Button, Button2],
			},
		},
	});

	expect(actual).toMatchSnapshot();
});

it('should renderer slots in id/render format', () => {
	const actual = shallow(<Slot name="slot" props={{ id: 'Pizza' }} />, {
		context: {
			slots: {
				slot: fillsWithIds,
			},
		},
	});

	expect(actual).toMatchSnapshot();
});

it('should pass active flag to active slot', () => {
	const actual = shallow(<Slot name="slot" active="two" />, {
		context: {
			slots: {
				slot: fillsWithIds,
			},
		},
	});

	expect(actual).toMatchSnapshot();
});

it('should renderer only active slot if onlyActive=true', () => {
	const actual = shallow(<Slot name="slot" active="two" onlyActive />, {
		context: {
			slots: {
				slot: fillsWithIds,
			},
		},
	});

	expect(actual).toMatchSnapshot();
});

it('should pass slot ID to onClick handler', () => {
	const onClick = jest.fn();
	const actual = mount(<Slot name="slot" props={{ onClick }} />, {
		context: {
			slots: {
				slot: fillsWithIds,
			},
		},
	});

	actual
		.find('button')
		.first()
		.simulate('click');

	expect(onClick).toBeCalledWith('one', expect.any(Object));
});

it('should return null if all slots render null', () => {
	const actual = render(<Slot name="slot" props={{ id: 'Pizza' }} />, {
		context: {
			slots: {
				slot: [() => null],
			},
		},
	});

	expect(actual.node).toBeFalsy();
});
