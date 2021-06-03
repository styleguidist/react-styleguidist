/* eslint-disable @typescript-eslint/naming-convention */

import React from 'react';
import { render } from '@testing-library/react';
import ReactComponent from './ReactComponent';
import slots from '../slots';
import Context from '../Context';
import { DisplayModes } from '../../consts';
import * as Rsg from '../../../typings';
import config from '../../../scripts/schemas/config';

const compileExample = config.compileExample.default;

const module: Rsg.ExamplesModule = {
	default: ({ componentName, exampleMode }) => (
		<h1>
			{componentName}/{exampleMode}
		</h1>
	),
	__esModule: true,
	__documentScope: {},
	__exampleScope: {},
	__storiesScope: {},
	__currentComponent: () => null,
	__examples: [],
	__namedExamples: {},
};

const context = {
	config: {
		pagePerSection: false,
		compileExample,
	},
	displayMode: DisplayModes.all,
	slots: slots(),
};

const Provider = (props: any) => <Context.Provider value={context} {...props} />;

const component = {
	name: 'Foo',
	visibleName: 'Foo',
	slug: 'foo',
	href: '#foo',
	pathLine: 'foo/bar.js',
	props: {
		description: 'Bar',
		methods: [],
		examples: [],
	},
	metadata: {},
};

const componentWithEverything: Rsg.Component = {
	name: 'Foo',
	visibleName: 'Foo',
	slug: 'foo',
	pathLine: 'foo/bar.js',
	props: {
		description: 'Bar',
		methods: [
			{
				name: 'set',
				params: [
					{
						name: 'newValue',
						description: 'New value for the counter.',
						type: { type: 'NameExpression', name: 'Number' },
					},
				],
				returns: null,
				description: 'Sets the counter to a particular value.',
			},
		],
		content: module,
	},
	metadata: {
		tags: ['one', 'two'],
	},
};

test('should render an example placeholder', () => {
	const { getByText } = render(
		<Provider>
			<ReactComponent component={component} depth={3} exampleMode="collapse" usageMode="collapse" />
		</Provider>
	);
	expect(getByText(/add examples to this component/i)).toBeInTheDocument();
});

test('should render example component', () => {
	const { getByText } = render(
		<Provider>
			<ReactComponent
				component={componentWithEverything}
				depth={3}
				exampleMode="collapse"
				usageMode="collapse"
			/>
		</Provider>
	);
	expect(getByText(/Foo\/collapse/i)).toBeInTheDocument();
});

test('should render usage closed by default when usageMode is "collapse"', () => {
	const { getByText } = render(
		<Provider>
			<ReactComponent
				component={componentWithEverything}
				depth={3}
				exampleMode="collapse"
				usageMode="collapse"
			/>
		</Provider>
	);
	expect(getByText(/props & methods/i)).toHaveAttribute('aria-pressed', 'false');
});

test('should render usage opened by default when usageMode is "expand"', () => {
	const { getByText } = render(
		<Provider>
			<ReactComponent
				component={componentWithEverything}
				depth={3}
				exampleMode="collapse"
				usageMode="expand"
			/>
		</Provider>
	);
	expect(getByText(/props & methods/i)).toHaveAttribute('aria-pressed', 'true');
});

test('should not render usage when usageMode is "hide"', () => {
	const { queryByText } = render(
		<Provider>
			<ReactComponent
				component={componentWithEverything}
				depth={3}
				exampleMode="collapse"
				usageMode="hide"
			/>
		</Provider>
	);
	expect(queryByText(/props & methods/i)).not.toBeInTheDocument();
});

test('should not render anything when component has no name', () => {
	const { container } = render(
		<Provider>
			<ReactComponent
				component={{ slug: 'foo', props: {} }}
				depth={3}
				exampleMode="collapse"
				usageMode="collapse"
			/>
		</Provider>
	);
	expect(container).toBeEmptyDOMElement();
});

test('should not render component in isolation mode by default', () => {
	const { getByLabelText } = render(
		<Provider>
			<ReactComponent component={component} depth={3} exampleMode="collapse" usageMode="collapse" />
		</Provider>
	);
	expect(getByLabelText(/open isolated/i)).toBeInTheDocument();
});

test('should render component in isolation mode', () => {
	const { getByLabelText } = render(
		<Provider
			value={{
				...context,
				displayMode: DisplayModes.component,
			}}
		>
			<ReactComponent component={component} depth={3} exampleMode="collapse" usageMode="collapse" />
		</Provider>
	);
	expect(getByLabelText(/show all components/i)).toBeInTheDocument();
});

test('should prefix description with deprecated label when @deprecated is present in tags', () => {
	const { getByText } = render(
		<Provider>
			<ReactComponent
				component={{
					...component,
					props: {
						tags: {
							deprecated: [
								{
									title: 'deprecated',
									description: 'I am deprecated',
								},
							],
						},
					},
				}}
				depth={3}
				exampleMode="collapse"
				usageMode="collapse"
			/>
		</Provider>
	);
	expect(getByText(/deprecated:/i)).toBeInTheDocument();
});
