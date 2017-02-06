import React from 'react';
import noop from 'lodash/noop';
import Markdown from '../Markdown';
import Playground from '../Playground';
import ReactComponent from './ReactComponent';
import { ReactComponentRenderer } from './ReactComponentRenderer';

const component = {
	name: 'Foo',
	pathLine: 'foo/bar.js',
	props: {
		description: 'Bar',
	},
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
};

it('should render component renderer', () => {
	const actual = shallow(
		<ReactComponent
			component={component}
		/>
	);

	expect(actual).toMatchSnapshot();
});

it('renderer should render component', () => {
	const actual = shallow(
		<ReactComponentRenderer
			classes={{}}
			name={component.name}
			pathLine={component.pathLine}
			description={component.props.description}
			examples={[
				<Playground
					key={0}
					index={0}
					name="Component"
					code={component.examples[0].content}
					evalInContext={component.examples[0].evalInContext}
				/>,
				<Markdown
					key={1}
					text={component.examples[1].content}
				/>,
			]}
		/>
	);

	expect(actual).toMatchSnapshot();
});

test('should render props section', () => {
	const actual = shallow(
		<ReactComponentRenderer
			classes={{}}
			name="Test"
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
			pathLine="test"
		/>
	);

	expect(actual).toMatchSnapshot();
});
