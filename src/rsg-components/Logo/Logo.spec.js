import test from 'ava';
import React from 'react';
import { LogoRenderer } from './LogoRenderer';

test('renderer should render header', () => {
	const children = '<button>OK</button>';
	const actual = shallow(
		<LogoRenderer classes={{}}>{children}</LogoRenderer>
	);

	expect(actual.node, 'to contain',
		<h1>{children}</h1>
	);
});
