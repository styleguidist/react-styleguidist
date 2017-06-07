import React from 'react';
import { ParaRenderer } from './ParaRenderer';

it('should render paragraph', () => {
	const actual = shallow(<ParaRenderer classes={{}}>Pizza</ParaRenderer>);

	expect(actual).toMatchSnapshot();
});
