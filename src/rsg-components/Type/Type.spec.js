import React from 'react';
import { TypeRenderer } from './TypeRenderer';

it('renderer should render type', () => {
	const actual = shallow(<TypeRenderer classes={{}}>Array</TypeRenderer>);

	expect(actual).toMatchSnapshot();
});
