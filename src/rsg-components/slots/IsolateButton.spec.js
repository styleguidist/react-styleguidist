import React from 'react';
import IsolateButton from './IsolateButton';

it('should renderer a link to isolated mode', () => {
	const actual = shallow(<IsolateButton name="Pizza" />);

	expect(actual).toMatchSnapshot();
});

it('should renderer a link to example isolated mode', () => {
	const actual = shallow(<IsolateButton name="Pizza" example={3} />);

	expect(actual).toMatchSnapshot();
});

it('should renderer a link home in isolated mode', () => {
	const actual = shallow(<IsolateButton name="Pizza" isolated />);

	expect(actual).toMatchSnapshot();
});
