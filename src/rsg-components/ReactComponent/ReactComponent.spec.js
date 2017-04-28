import React from 'react';
import noop from 'lodash/noop';
import Markdown from '../Markdown';
import Playground from '../Playground';
import ReactComponent from './ReactComponent';
import { ReactComponentRenderer } from './ReactComponentRenderer';

const component = {
	name: 'Foo',
	slug: 'foo',
	pathLine: 'foo/bar.js',
	props: {
		description: 'Bar',
		methods: [],
		examples: [],
	},
};
const componentWithExamples = {
	name: 'Foo',
	slug: 'foo',
	pathLine: 'foo/bar.js',
	props: {
		description: 'Bar',
		methods: [],
		examples: [
			{
				type: 'code',
				content: '<button>OK</button>',
				evalInContext: noop,
			},
			{
				type: 'markdown',
				content: 'Hello *world*!',
			},
		],
	},
};
const componentWithProps = {
	name: 'Foo',
	slug: 'foo',
	pathLine: 'foo/bar.js',
	props: {
		description: 'Bar',
		props: {
			children: {
				type: { name: 'string' },
				required: true,
				description: 'Button label.',
			},
		},
		methods: [],
		examples: [],
	},
};
const componentWithMethods = {
	name: 'Foo',
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
						type: { name: 'Number' },
					},
				],
				returns: null,
				description: 'Sets the counter to a particular value.',
			},
		],
		examples: [],
	},
};

it('should render component renderer with example placeholder', () => {
	const actual = shallow(
		<ReactComponent
			component={component}
		/>
	);

	expect(actual).toMatchSnapshot();
});

it('should render component renderer for component with examples', () => {
	const actual = shallow(
		<ReactComponent
			component={componentWithExamples}
		/>
	);

	expect(actual).toMatchSnapshot();
});

it('should render component renderer for component with props', () => {
	const actual = shallow(
		<ReactComponent
			component={componentWithProps}
		/>
	);

	expect(actual).toMatchSnapshot();
});

it('should render component renderer for component with methods', () => {
	const actual = shallow(
		<ReactComponent
			component={componentWithMethods}
		/>
	);

	expect(actual).toMatchSnapshot();
});

it('should return null when component has no name', () => {
	const actual = shallow(
		<ReactComponent component={{ slug: 'foo', props: {} }} />
	);

	expect(actual.node).toBe(null);
});

it('renderer should render component', () => {
	const actual = shallow(
		<ReactComponentRenderer
			classes={{}}
			name={componentWithExamples.name}
			slug={componentWithExamples.slug}
			pathLine={componentWithExamples.pathLine}
			description={componentWithExamples.props.description}
			examples={[
				<Playground
					key={0}
					index={0}
					name="Component"
					code={componentWithExamples.props.examples[0].content}
					evalInContext={componentWithExamples.props.examples[0].evalInContext}
				/>,
				<Markdown
					key={1}
					text={componentWithExamples.props.examples[1].content}
				/>,
			]}
		/>
	);

	expect(actual).toMatchSnapshot();
});

test('should render component not in the isolation mode by default', () => {
	const actual = render(
		<ReactComponentRenderer
			classes={{}}
			name="Test"
			slug="test"
			pathLine="test"
		/>
	);

	expect(actual.find('a:not(a[aria-hidden])').text()).toEqual('Open isolated ⇢');
});

test('should render component in isolation mode', () => {
	const actual = render(
		<ReactComponentRenderer
			classes={{}}
			name="Test"
			slug="Test"
			pathLine="test"
			isolated
		/>
	);

	expect(actual.find('a:not(a[aria-hidden])').text()).toEqual('← Back');
});

test('should render props section', () => {
	const actual = shallow(
		<ReactComponentRenderer
			classes={{}}
			name="Test"
			slug="test"
			pathLine="test"
			props={<div>test</div>}
		/>
	);

	expect(actual).toMatchSnapshot();
});

test('should render methods section', () => {
	const actual = shallow(
		<ReactComponentRenderer
			classes={{}}
			name="Test"
			slug="test"
			pathLine="test"
			props={null}
			methods={<div>test</div>}
		/>
	);

	expect(actual).toMatchSnapshot();
});

test('should render both props and methods section', () => {
	const actual = shallow(
		<ReactComponentRenderer
			classes={{}}
			name="Test"
			slug="test"
			pathLine="test"
			props={<div>prop</div>}
			methods={<div>method</div>}
		/>
	);

	expect(actual).toMatchSnapshot();
});

test('should not render props / methods section if there is no content', () => {
	const actual = shallow(
		<ReactComponentRenderer
			classes={{}}
			name="Test"
			slug="test"
			pathLine="test"
		/>
	);

	expect(actual).toMatchSnapshot();
});

it('renderer should render name styled with className=deprecatedName when @deprecated is present in tags', () => {
	const deprecatedComponent = {
		...component,
		props: {
			...component.props,
			tags: {
				deprecated: [{
					title: 'deprecated',
					description: 'I am deprecated',
				}],
			},
		},
	};

	const actual = render(
		<ReactComponent
			component={deprecatedComponent}
		/>
	);

	expect(actual.find('span[class^=deprecatedName]').length).toBe(1);
});
