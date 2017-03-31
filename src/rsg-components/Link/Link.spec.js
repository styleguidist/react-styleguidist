import React from 'react';
import Link, { LinkRenderer } from './LinkRenderer';

const href = '/foo';
const children = 'Foo';

it('renderer should render link', () => {
	const actual = shallow(
		<LinkRenderer href={href} classes={{}}>{children}</LinkRenderer>
	);

	expect(actual).toMatchSnapshot();
});

it('should compose passed class names', () => {
	const actual = render(
		<Link
			href={href}
			className="customClassName"
		>
			{children}
		</Link>
	);

	expect(actual.find('a').hasClass('customClassName')).toEqual(true);
});
