import React from 'react';
import Wrapper from './Wrapper';

it('should render children', () => {
	const children = <span>Hello</span>;
	const actual = shallow(<Wrapper onError={() => {}}>{children}</Wrapper>);

	expect(actual).toMatchSnapshot();
});

it('should call onError handler when React invokes error handler', () => {
	const onError = jest.fn();
	const actual = shallow(<Wrapper onError={onError}>blah</Wrapper>);

	// faux error
	actual.instance().componentDidCatch('err');

	expect(onError).toHaveBeenCalledTimes(1);
	expect(onError).toHaveBeenCalledWith('err');
});
