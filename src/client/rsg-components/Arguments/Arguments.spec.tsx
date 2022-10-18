import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import { ArgumentsRenderer, styles } from './ArgumentsRenderer';

const props = {
	classes: classes(styles),
};

const args = [
	{
		name: 'Foo',
		description: 'Converts foo to bar',
		type: { name: 'Array' },
	},
	{
		name: 'Foo',
	},
];

it('renderer should render arguments', () => {
	const renderer = createRenderer();
	renderer.render(<ArgumentsRenderer {...props} args={args} />);

	expect(renderer.getRenderOutput()).toMatchSnapshot();
});

it('renderer should render heading', () => {
	const renderer = createRenderer();
	renderer.render(<ArgumentsRenderer {...props} args={[args[1]]} heading />);

	expect(renderer.getRenderOutput()).toMatchSnapshot();
});

it('renderer should render nothing for empty array', () => {
	const renderer = createRenderer();
	renderer.render(<ArgumentsRenderer {...props} args={[]} />);

	expect(renderer.getRenderOutput()).toBe(null);
});
