import React from 'react';
import { shallow } from 'enzyme';
import { TypeRenderer, styles } from './TypeRenderer';

const props = {
	classes: classes(styles),
};

it('renderer should render type', () => {
	const actual = shallow(<TypeRenderer {...props}>Array</TypeRenderer>);

	expect(actual).toMatchSnapshot();
});
