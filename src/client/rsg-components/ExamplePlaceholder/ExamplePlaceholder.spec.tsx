import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ExamplePlaceholderRenderer } from './ExamplePlaceholderRenderer';

test('should render an example placeholder after button click', () => {
	const { getByText, queryByText } = render(
		<ExamplePlaceholderRenderer classes={{}} name="Pizza" />
	);
	fireEvent.click(getByText(/add examples to this component/i));
	expect(getByText('Pizza.md')).toBeInTheDocument();
	expect(queryByText(/add examples to this component/i)).not.toBeInTheDocument();
});
