import React from 'react';
import { shallow } from 'enzyme';
import IsolateButton from './IsolateButton';

it('should renderer a link to isolated mode', () => {
	const actual = shallow(<IsolateButton name="Pizza" href="/#pizza" />);

	expect(actual).toMatchSnapshot();
});

it('should renderer a link to example isolated mode', () => {
	const actual = shallow(<IsolateButton name="Pizza" href="/#pizza" example={3} />);

	expect(actual).toMatchSnapshot();
});

it('should renderer a link home in isolated mode', () => {
	const actual = shallow(<IsolateButton name="Pizza" href="/#pizza" isolated />);

	expect(actual).toMatchSnapshot();
});
