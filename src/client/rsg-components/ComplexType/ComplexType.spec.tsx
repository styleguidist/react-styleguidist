import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ComplexType from './ComplexTypeRenderder';

function renderComponent(name = 'color', raw = 'red | blue') {
	return render(<ComplexType name={name} raw={raw} />);
}

describe('ComplexType', () => {
	test('should render name', () => {
		const { getByRole } = renderComponent();
		expect(getByRole('button')).toHaveTextContent('color');
	});

	test('should render raw text in the tooltip', () => {
		const { container, getByRole } = renderComponent();
		fireEvent.focus(getByRole('button'));
		expect(container.querySelector('[data-tippy-root]')).toHaveTextContent('red | blue');
	});
});
