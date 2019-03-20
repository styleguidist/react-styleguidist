import React from 'react';
import UsageTabButton from './UsageTabButton';

const props = {
	name: 'Pizza',
	onClick: () => {},
};

it('should renderer a button', () => {
	const actual = shallow(<UsageTabButton {...props} props={{ props: [{ name: 'foo' }] }} />);

	expect(actual).toMatchSnapshot();
});

it('should renderer null if there are not props or methods', () => {
	const actual = shallow(<UsageTabButton {...props} props={{}} />);

	expect(actual.getElement()).toBeFalsy();
});
