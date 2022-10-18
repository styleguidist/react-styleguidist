import React from 'react';
import renderer from 'react-test-renderer';
import LogoRenderer from './LogoRenderer';

it('renderer should render header', () => {
	const actual = renderer.create(<LogoRenderer>React Styleguidist</LogoRenderer>);

	expect(actual.toJSON()).toMatchSnapshot();
});
