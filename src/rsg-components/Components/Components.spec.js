import test from 'ava';
import React from 'react';
import ReactComponent from '../ReactComponent';
import Sections from '../Sections';
import Components from './Components';
import ComponentsRenderer from './ComponentsRenderer';

const components = [
	{
		name: 'Foo',
		pathLine: 'components/foo.js',
		filepath: 'components/foo.js',
		props: {
			description: 'Foo foo',
		},
	},
	{
		name: 'Bar',
		pathLine: 'components/bar.js',
		filepath: 'components/bar.js',
		props: {
			description: 'Bar bar',
		},
	},
];

test('should render components list', () => {
	const actual = shallow(
		<Components
			components={components}
			sections={[]}
		/>
	);

	expect(actual.node, 'to contain',
		<ComponentsRenderer
			components={[
				<ReactComponent component={components[0]} />,
				<ReactComponent component={components[1]} />,
			]}
			sections={<Sections sections={[]} />}
		/>
	);
});

test('renderer should render components list layout', () => {
	const actual = shallow(
		<ComponentsRenderer
			components={[
				<ReactComponent component={components[0]} />,
				<ReactComponent component={components[1]} />,
			]}
			sections={<Sections sections={[]} />}
		/>
	);

	expect(actual.node, 'to contain',
		<div>
			<ReactComponent component={components[0]} />
			<ReactComponent component={components[1]} />
			<Sections sections={[]} />
		</div>
	);
});
