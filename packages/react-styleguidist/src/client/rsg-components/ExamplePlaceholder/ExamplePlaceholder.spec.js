import React from 'react';
import { ExamplePlaceholderRenderer } from './ExamplePlaceholderRenderer';

it('should render a link', () => {
	const actual = shallow(<ExamplePlaceholderRenderer classes={{}} name="Pizza" />);

	expect(actual).toMatchSnapshot();
});

it('should render an example placeholder after click', () => {
	const actual = shallow(<ExamplePlaceholderRenderer classes={{}} name="Pizza" />);

	actual.find('button').simulate('click');

	expect(actual).toMatchSnapshot();
});
