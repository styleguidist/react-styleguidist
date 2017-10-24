import React from 'react';
import Wrapper from './Wrapper';

it('should render children', () => {
	const children = <span>Hello</span>;
	const actual = shallow(<Wrapper onError={() => {}}>{children}</Wrapper>);

	expect(actual).toMatchSnapshot();
});
