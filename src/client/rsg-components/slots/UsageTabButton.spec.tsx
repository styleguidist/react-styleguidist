import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import UsageTabButton from './UsageTabButton';

const props = {
	name: 'Pizza',
	onClick: () => {},
};

it('should renderer a button', () => {
	const renderer = createRenderer();
	renderer.render(<UsageTabButton {...props} props={{ props: [{ name: 'foo' }] }} />);

	expect(renderer.getRenderOutput()).toMatchSnapshot();
});

it('should renderer null if there are not props or methods', () => {
	const renderer = createRenderer();
	renderer.render(<UsageTabButton {...props} props={{}} />);

	expect(renderer.getRenderOutput()).toBe(null);
});
