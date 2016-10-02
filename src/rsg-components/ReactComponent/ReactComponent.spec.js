import test from 'ava';
import React from 'react';
import noop from 'lodash/noop';
import Examples from '../Examples';
import Markdown from '../Markdown';
import Playground from '../Playground';
import ReactComponent from './ReactComponent';
import ReactComponentRenderer from './ReactComponentRenderer';

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

test('should render component renderer', () => {
	const actual = shallow(
		<ReactComponent
			component={component}
		/>
	);

	expect(actual.node, 'to contain',
		<ReactComponentRenderer
			name={component.name}
			pathLine={component.pathLine}
			description={<Markdown text={component.props.description} />}
			examples={<Examples examples={component.examples} />}
		/>
	);
});

test('render should render component', () => {
	const actual = shallow(
		<ReactComponentRenderer
			name={component.name}
			pathLine={component.pathLine}
			description={component.props.description}
			examples={[
				<Playground
					code={component.examples[0].content}
					evalInContext={component.examples[0].evalInContext}
				/>,
				<Markdown
					text={component.examples[1].content}
				/>,
			]}
		/>
	);

	expect(actual.node, 'to contain',
		<h2>{component.name}</h2>
	);
	expect(actual.node, 'to contain',
		<div>{component.pathLine}</div>
	);
	expect(actual.node, 'to contain',
		<div>{component.props.description}</div>
	);
	expect(actual.node, 'to contain',
		<Playground
			code={component.examples[0].content}
			evalInContext={component.examples[0].evalInContext}
		/>
	);
	expect(actual.node, 'to contain',
		<Markdown
			text={component.examples[1].content}
		/>
	);
});
