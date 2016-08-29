import test from 'ava';
import React from 'react';
import Markdown from '../Markdown';
import ReactComponent from './ReactComponent';
import Renderer from './Renderer';

test('should render component properties', () => {
	const component = {
		name: 'Foo',
		pathLine: 'foo/bar.js',
		props: {
			description: 'Bar',
		},
	};

	const RCComponentHOC = ReactComponent(Renderer);
	const RCComponent = new RCComponentHOC({ component });
	const actual = shallow(RCComponent.render());

	expect(actual.node, 'to contain',
		<div>
			<header>
				<h2>Foo</h2>
				<div>foo/bar.js</div>
			</header>
			<div>
				<Markdown text="Bar" />
			</div>
		</div>
	);
});
