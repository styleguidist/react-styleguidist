import React from 'react';
import { ToolbarButtonRenderer, styles } from './ToolbarButtonRenderer';

const props = {
	classes: classes(styles),
	title: 'Pizza button',
};

it('should render a button', () => {
	const actual = shallow(
		<ToolbarButtonRenderer {...props} onClick={() => {}}>
			pizza
		</ToolbarButtonRenderer>
	);

	expect(actual).toMatchSnapshot();
});

it('should render a link', () => {
	const actual = shallow(
		<ToolbarButtonRenderer {...props} href="/foo">
			pizza
		</ToolbarButtonRenderer>
	);

	expect(actual).toMatchSnapshot();
});

it('should pass a class name to a button', () => {
	const actual = shallow(
		<ToolbarButtonRenderer {...props} onClick={() => {}} className="foo-class">
			pizza
		</ToolbarButtonRenderer>
	);

	expect(actual.prop('className')).toBe('button foo-class');
});

it('should pass a class name to a link', () => {
	const actual = shallow(
		<ToolbarButtonRenderer {...props} href="/foo" className="foo-class">
			pizza
		</ToolbarButtonRenderer>
	);

	expect(actual.prop('className')).toBe('button foo-class');
});

it('should render a button with small styles', () => {
	const actual = shallow(
		<ToolbarButtonRenderer {...props} onClick={() => {}} small>
			butterbrot
		</ToolbarButtonRenderer>
	);

	expect(actual.prop('className')).toBe('button isSmall');
});
