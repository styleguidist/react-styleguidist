import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import ReactComponent from '../ReactComponent';
import Components from './Components';
import ComponentsRenderer from './ComponentsRenderer';
import { ExampleModes, UsageModes } from '../../consts';

const exampleMode = ExampleModes.collapse;
const usageMode = UsageModes.collapse;
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
	const renderer = createRenderer();
	renderer.render(
		<Components components={components} exampleMode={exampleMode} usageMode={usageMode} depth={3} />
	);

	expect(renderer.getRenderOutput()).toMatchSnapshot();
});

it('renderer should render components list layout', () => {
	const renderer = createRenderer();
	renderer.render(
		<ComponentsRenderer>
			<ReactComponent
				key={0}
				component={components[0]}
				exampleMode={exampleMode}
				usageMode={usageMode}
				depth={3}
			/>
			<ReactComponent
				key={1}
				component={components[1]}
				exampleMode={exampleMode}
				usageMode={usageMode}
				depth={3}
			/>
		</ComponentsRenderer>
	);

	expect(renderer.getRenderOutput()).toMatchSnapshot();
});
