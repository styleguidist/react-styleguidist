import React from 'react';
import { NameRenderer } from './NameRenderer';

const classes = {
	name: 'name',
	isDeprecated: 'isDeprecated',
};

it('renderer should render argument name', () => {
	const actual = shallow(<NameRenderer classes={classes} name="Foo" />);

	expect(actual).toMatchSnapshot();
});

it('renderer should render deprecated argument name', () => {
	const actual = shallow(<NameRenderer classes={classes} name="Foo" deprecated />);

	expect(actual).toMatchSnapshot();
});
