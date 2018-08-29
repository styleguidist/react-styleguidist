import React from 'react';
import Slot from './Slot';
import { Provider } from '../../provider';

/* eslint-disable react/prop-types */

const Button = ({ name, onClick, children }) => (
	<button name={name} onClick={onClick}>
		{children}
	</button>
);

const Button2 = props => <Button {...props}>2</Button>;

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
	const context = {
		slots: {
			slot: [Button, Button2],
		},
	};
	const actual = shallow(
		<Provider {...context}>
			<Slot name="slot" props={{ id: 'Pizza' }} />
		</Provider>
	);

	expect(actual).toMatchSnapshot();
});

it('should renderer slots in id/render format', () => {
	const context = {
		slots: {
			slot: fillsWithIds,
		},
	};
	const actual = shallow(
		<Provider {...context}>
			<Slot name="slot" props={{ id: 'Pizza' }} />
		</Provider>
	);

	expect(actual).toMatchSnapshot();
});

it('should pass active flag to active slot', () => {
	const context = {
		slots: {
			slot: fillsWithIds,
		},
	};
	const actual = shallow(
		<Provider {...context}>
			<Slot name="slot" active="two" />
		</Provider>
	);

	expect(actual).toMatchSnapshot();
});

it('should renderer only active slot if onlyActive=true', () => {
	const context = {
		slots: {
			slot: fillsWithIds,
		},
	};
	const actual = shallow(
		<Provider {...context}>
			<Slot name="slot" active="two" onlyActive />
		</Provider>
	);

	expect(actual).toMatchSnapshot();
});

it('should pass slot ID to onClick handler', () => {
	const onClick = jest.fn();
	const context = {
		slots: {
			slot: fillsWithIds,
		},
	};
	const actual = mount(
		<Provider {...context}>
			<Slot name="slot" props={{ onClick }} />
		</Provider>
	);

	actual.find('button[name="two"]').simulate('click');

	expect(onClick).toBeCalledWith('two', expect.any(Object));
});

it('should return null if all slots render null', () => {
	const context = {
		slots: {
			slot: [() => null],
		},
	};
	const actual = render(
		<Provider {...context}>
			<Slot name="slot" props={{ id: 'Pizza' }} />
		</Provider>
	);

	expect(actual.node).toBeFalsy();
});
