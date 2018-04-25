import React from 'react';
import LogoRenderer from './LogoRenderer';

it('renderer should render header', () => {
	const actual = render(<LogoRenderer>React Styleguidist</LogoRenderer>);

	expect(actual).toMatchSnapshot();
});
