import React from 'react';
import { shallow } from 'enzyme';
import { NameRenderer, styles } from './NameRenderer';
// TODO: simplify this path
import classes from '../../../../test/classes';

const props = {
	classes: classes(styles),
};

it('renderer should render argument name', () => {
	const actual = shallow(<NameRenderer {...props}>Foo</NameRenderer>);

	expect(actual).toMatchSnapshot();
});

it('renderer should render deprecated argument name', () => {
	const actual = shallow(
		<NameRenderer {...props} deprecated>
			Foo
		</NameRenderer>
	);

	expect(actual).toMatchSnapshot();
});
