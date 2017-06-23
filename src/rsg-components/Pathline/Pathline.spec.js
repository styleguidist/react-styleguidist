import React from 'react';
import { PathlineRenderer } from './PathlineRenderer';

it('renderer should a path line', () => {
	const pathline = 'foo/bar';
	const actual = shallow(<PathlineRenderer classes={{}}>{pathline}</PathlineRenderer>);

	expect(actual).toMatchSnapshot();
});
