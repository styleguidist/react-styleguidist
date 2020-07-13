import React from 'react';
import { render } from '@testing-library/react';
import Section from 'rsg-components/Section';
import Context from '../Context';
import slots from '../slots';
import { DisplayModes } from '../../consts';

const context = {
	config: {
		pagePerSection: false,
	},
	displayMode: DisplayModes.all,
	slots: slots(),
} as any;

const Provider = (props: any) => <Context.Provider value={context} {...props} />;

test('should render nested sections', () => {
	const { getByTestId } = render(
		<Provider>
			<Section
				section={{
					name: 'Outer section',
					slug: 'outer-section',
					usageMode: 'collapse',
					exampleMode: 'collapse',
					sections: [
						{
							name: 'Nested section',
							slug: 'nested-section',
							usageMode: 'collapse',
							exampleMode: 'collapse',
						},
					],
				}}
				depth={3}
			/>
		</Provider>
	);
	expect(getByTestId('section-outer-section')).toContainElement(
		getByTestId('section-nested-section')
	);
});

test('should render components inside a section', () => {
	const { getByTestId, getByText } = render(
		<Provider>
			<Section
				section={{
					name: 'Components',
					slug: 'components',
					usageMode: 'collapse',
					exampleMode: 'collapse',
					components: [
						{
							name: 'Foo',
							visibleName: 'Foo',
							slug: 'foo',
							pathLine: 'components/foo.js',
							filepath: 'components/foo.js',
							props: {
								description: 'Foo foo',
							},
						},
						{
							name: 'Bar',
							visibleName: 'Bar',
							slug: 'bar',
							pathLine: 'components/bar.js',
							filepath: 'components/bar.js',
							props: {
								description: 'Bar bar',
							},
						},
					],
				}}
				depth={3}
			/>
		</Provider>
	);
	expect(getByTestId('section-components')).toContainElement(getByText('components/foo.js'));
	expect(getByTestId('section-components')).toContainElement(getByText('components/bar.js'));
});

test('should not render section in isolation mode by default', () => {
	const { getByLabelText } = render(
		<Provider>
			<Section
				section={{
					name: 'A',
					slug: 'a',
					usageMode: 'collapse',
					exampleMode: 'collapse',
				}}
				depth={3}
			/>
		</Provider>
	);
	expect(getByLabelText(/open isolated/i)).toBeInTheDocument();
});

test('should render section in isolation mode', () => {
	const { queryByLabelText } = render(
		<Provider
			value={{
				...context,
				displayMode: DisplayModes.section,
			}}
		>
			<Section
				section={{
					name: 'A',
					slug: 'a',
					usageMode: 'collapse',
					exampleMode: 'collapse',
				}}
				depth={3}
			/>
		</Provider>
	);
	expect(queryByLabelText(/open isolated/i)).toBeNull();
});
