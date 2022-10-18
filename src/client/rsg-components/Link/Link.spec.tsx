import { render } from '@testing-library/react';
import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import { LinkRenderer } from './LinkRenderer';

const href = '/foo';
const children = 'Foo';

it('renderer should render link', () => {
	const renderer = createRenderer();
	renderer.render(
		<LinkRenderer href={href} classes={{}}>
			{children}
		</LinkRenderer>
	);

	expect(renderer.getRenderOutput()).toMatchSnapshot();
});

it('should compose passed class names', () => {
	const { getByRole } = render(
		<LinkRenderer classes={{ link: 'baseLinkClass' }} href={href} className="customClass">
			{children}
		</LinkRenderer>
	);

	const a = getByRole('link');
	expect(a.className).toBe('baseLinkClass customClass');
});

it('should properly pass the target attribute', () => {
	const { getByRole } = render(
		<LinkRenderer href={href} target="_blank" classes={{}}>
			{children}
		</LinkRenderer>
	);

	const a = getByRole('link');
	expect(a.getAttribute('target')).toBe('_blank');
});
