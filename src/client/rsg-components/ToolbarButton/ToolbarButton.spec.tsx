import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import { ToolbarButtonRenderer, styles } from './ToolbarButtonRenderer';

const props = {
	classes: classes(styles),
	title: 'Pizza button',
};

it('should render a button', () => {
	const renderer = createRenderer();
	renderer.render(
		<ToolbarButtonRenderer {...props} onClick={() => {}}>
			pizza
		</ToolbarButtonRenderer>
	);

	expect(renderer.getRenderOutput()).toMatchSnapshot();
});

it('should render a link', () => {
	const renderer = createRenderer();
	renderer.render(
		<ToolbarButtonRenderer {...props} href="/foo">
			pizza
		</ToolbarButtonRenderer>
	);

	expect(renderer.getRenderOutput()).toMatchSnapshot();
});

it('should pass a class name to a button', () => {
	const renderer = createRenderer();
	renderer.render(
		<ToolbarButtonRenderer {...props} onClick={() => {}} className="foo-class">
			pizza
		</ToolbarButtonRenderer>
	);

	expect(renderer.getRenderOutput()).toMatchSnapshot();
});

it('should pass a class name to a link', () => {
	const renderer = createRenderer();
	renderer.render(
		<ToolbarButtonRenderer {...props} href="/foo" className="foo-class">
			pizza
		</ToolbarButtonRenderer>
	);

	expect(renderer.getRenderOutput()).toMatchSnapshot();
});

it('should render a button with small styles', () => {
	const renderer = createRenderer();
	renderer.render(
		<ToolbarButtonRenderer {...props} onClick={() => {}} small>
			butterbrot
		</ToolbarButtonRenderer>
	);

	expect(renderer.getRenderOutput()).toMatchSnapshot();
});
