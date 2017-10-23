import React from 'react';
import LogoRenderer from './LogoRenderer';

it('renderer should render header', () => {
	const actual = shallow(<LogoRenderer>React Styleguidist</LogoRenderer>);

	expect(actual.dive()).toMatchSnapshot();
});
