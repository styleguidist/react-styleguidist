import test from 'ava';
import React from 'react';
import { LinkRenderer } from './LinkRenderer';

test('renderer should render link', () => {
	const href = '/foo';
	const children = 'Foo';
	const actual = shallow(
		<LinkRenderer href={href} classes={{}}>{children}</LinkRenderer>
	);

	expect(actual.node, 'to contain',
		<a href={href}>{children}</a>
	);
});
