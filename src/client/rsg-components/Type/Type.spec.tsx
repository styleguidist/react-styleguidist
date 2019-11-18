import React from 'react';
import { shallow } from 'enzyme';
import { TypeRenderer, styles } from './TypeRenderer';
import classes from '../../../../test/classes';

const props = {
	classes: classes(styles),
};

it('renderer should render type', () => {
	const actual = shallow(<TypeRenderer {...props}>Array</TypeRenderer>);

	expect(actual).toMatchSnapshot();
});
