import React from 'react';
import PropTypes from 'prop-types';
import { render, fireEvent } from '@testing-library/react';
import Slot from './Slot';
import Context from '../Context';

const Button = ({ active, children, ...props }: any) => {
	return (
		<button {...props} aria-current={active}>
			{children}
		</button>
	);
};
Button.propTypes = {
	active: PropTypes.bool,
	children: PropTypes.node,
};

const Button1 = (props: any) => <Button {...props}>Button1</Button>;
const Button2 = (props: any) => <Button {...props}>Button2</Button>;

const fillsWithIds = [
	{
		id: 'one',
		render: Button1,
	},
	{
		id: 'two',
		render: Button2,
	},
];

it('should render slots and pass props', () => {
	const { getByText, getAllByRole } = render(
		<Context.Provider
			value={
				{
					slots: {
						slot: [Button1, Button2],
					},
				} as any
			}
		>
			<Slot name="slot" props={{ role: 'pizza' }} />
		</Context.Provider>
	);

	expect(getByText('Button1')).toBeInTheDocument();
	expect(getByText('Button2')).toBeInTheDocument();
	expect(getAllByRole('pizza')).toHaveLength(2);
});

it('should render slots in id/render format', () => {
	const { getByText } = render(
		<Context.Provider
			value={
				{
					slots: {
						slot: fillsWithIds,
					},
				} as any
			}
		>
			<Slot name="slot" props={{ id: 'Pizza' }} />
		</Context.Provider>
	);

	expect(getByText('Button1')).toBeInTheDocument();
	expect(getByText('Button2')).toBeInTheDocument();
});

it('should pass active flag to active slot', () => {
	const { getByText } = render(
		<Context.Provider
			value={
				{
					slots: {
						slot: fillsWithIds,
					},
				} as any
			}
		>
			<Slot name="slot" active="two" />
		</Context.Provider>
	);

	expect(getByText('Button1')).toHaveAttribute('aria-current', 'false');
	expect(getByText('Button2')).toHaveAttribute('aria-current', 'true');
});

it('should render only active slot if onlyActive=true', () => {
	const { queryByText } = render(
		<Context.Provider
			value={
				{
					slots: {
						slot: fillsWithIds,
					},
				} as any
			}
		>
			<Slot name="slot" active="two" onlyActive />
		</Context.Provider>
	);

	expect(queryByText('Button1')).not.toBeInTheDocument();
	expect(queryByText('Button2')).toBeInTheDocument();
});

it('should pass slot ID to onClick handler', () => {
	const onClick = jest.fn();
	const { getByText } = render(
		<Context.Provider
			value={
				{
					slots: {
						slot: fillsWithIds,
					},
				} as any
			}
		>
			<Slot name="slot" props={{ onClick }} />
		</Context.Provider>
	);

	fireEvent.click(getByText('Button2'));

	expect(onClick).toHaveBeenCalledTimes(1);
	expect(onClick.mock.calls[0][0]).toBe('two');
});

it('should return null if all slots render null', () => {
	const { queryByText } = render(
		<Context.Provider
			value={
				{
					slots: {
						slot: [() => null],
					},
				} as any
			}
		>
			<Slot name="slot" props={{ id: 'Pizza' }} />
		</Context.Provider>
	);

	expect(queryByText('Button1')).not.toBeInTheDocument();
	expect(queryByText('Button2')).not.toBeInTheDocument();
});
