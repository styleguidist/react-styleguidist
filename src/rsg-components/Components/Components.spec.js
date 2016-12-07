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

it('should render components list', () => {
	const actual = shallow(
		<Components
			components={components}
			sections={[]}
		/>
	);

	expect(actual).toMatchSnapshot();
});

it('renderer should render components list layout', () => {
	const actual = shallow(
		<ComponentsRenderer
			components={[
				<ReactComponent key={0} component={components[0]} />,
				<ReactComponent key={1} component={components[1]} />,
			]}
			sections={<Sections sections={[]} />}
		/>
	);

	expect(actual).toMatchSnapshot();
});
