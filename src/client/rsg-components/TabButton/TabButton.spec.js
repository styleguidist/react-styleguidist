import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TabButton from './index';

test('should call onClick handler when the button is clicked', () => {
	const onClick = jest.fn();
	const { getByText } = render(
		<TabButton name="pizza" onClick={onClick}>
			Pizza
		</TabButton>
	);
	fireEvent.click(getByText(/pizza/i));
	expect(onClick).toBeCalledTimes(1);
});
