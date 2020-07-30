import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Tooltip, { TooltipPlacement } from './TooltipRenderer';

function renderComponent(content = 'tooltip', placement?: TooltipPlacement) {
	return render(
		<Tooltip content={content} placement={placement}>
			<div data-testid="child" />
		</Tooltip>
	);
}

describe('Tooltip', () => {
	test('should render child component as is', () => {
		const { container, getByTestId } = renderComponent();
		expect(container).toContainElement(getByTestId('child'));
	});

	test('should render content in the tooltop body', () => {
		const { container, getByRole } = renderComponent();
		fireEvent.focus(getByRole('button'));
		expect(container.querySelector('[data-tippy-root]')).toHaveTextContent('tooltip');
	});

	test('should show the tooltip by focus in', async () => {
		const { container, getByRole } = renderComponent();
		fireEvent.focus(getByRole('button'));
		await waitFor(() =>
			expect(container.querySelector('[data-state="visible"]')).toBeInTheDocument()
		);
	});

	test('should show the tooltip by click', async () => {
		const { container, getByRole } = renderComponent();
		fireEvent.click(getByRole('button'));
		await waitFor(() =>
			expect(container.querySelector('[data-state="visible"]')).toBeInTheDocument()
		);
	});

	test('should show the tooltip by mouse enter', async () => {
		const { container, getByRole } = renderComponent();
		fireEvent.mouseEnter(getByRole('button'));
		await waitFor(() =>
			expect(container.querySelector('[data-state="visible"]')).toBeInTheDocument()
		);
	});

	describe.each([['top'], ['right'], ['left'], ['bottom']])(
		'Test placement attribute',
		placement => {
			test(`should have ${placement} in data-placement attribute`, async () => {
				// @ts-ignore
				const { container, getByRole } = renderComponent(undefined, placement);
				fireEvent.focus(getByRole('button'));
				await waitFor(() =>
					expect(container.querySelector('[data-state="visible"]')).toBeInTheDocument()
				);
				expect(container.querySelector('[data-placement]')).toHaveAttribute(
					'data-placement',
					placement
				);
			});
		}
	);
});
