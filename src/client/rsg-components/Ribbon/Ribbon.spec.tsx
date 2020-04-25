import React from 'react';
import { render } from '@testing-library/react';
import Ribbon from './Ribbon';
import Context from '../Context';

const url = 'http://example.com/';
const text = 'Share the repo';

it('should render ribbon if the ribbon is present in the config', () => {
	const { getByRole } = render(
		<Context.Provider value={{ config: { ribbon: { url } } } as any}>
			<Ribbon />
		</Context.Provider>
	);

	expect(getByRole('link')).toHaveAttribute('href', url);
});

it('should render ribbon with custom text', () => {
	const { getByText } = render(
		<Context.Provider
			value={
				{
					config: {
						ribbon: {
							url,
							text,
						},
					},
				} as any
			}
		>
			<Ribbon />
		</Context.Provider>
	);

	expect(getByText(text)).toBeInTheDocument();
});

it('should not render anything if the ribbon is not present in the config', () => {
	const { queryByRole } = render(
		<Context.Provider value={{ config: {} } as any}>
			<Ribbon />
		</Context.Provider>
	);

	expect(queryByRole('link')).not.toBeInTheDocument();
});
