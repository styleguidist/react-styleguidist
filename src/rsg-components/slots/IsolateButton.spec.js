import React from 'react';
import IsolateButton from './IsolateButton';

it('should renderer a link to isolated mode', () => {
	const actual = shallow(<IsolateButton slug="pizza" />);

	expect(actual).toMatchSnapshot();
});

it('should renderer a link to example isolated mode', () => {
	const actual = shallow(<IsolateButton slug="pizza" example={3} />);

	expect(actual).toMatchSnapshot();
});

it('should renderer a link home in isolated mode', () => {
	const actual = shallow(<IsolateButton slug="pizza" isolated />);

	expect(actual).toMatchSnapshot();
});
